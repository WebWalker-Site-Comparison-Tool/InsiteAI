import rateLimiter from './rateLimiter';

let checkRedis, checkSQL, queryGPT;

export async function GET(req, { params }) {
  // throttle based on client IP & requests per 30 seconds
  const limit = await rateLimiter(req.ip);

  // throttled? connection refused
  if (!limit.success) {
    res
      .status(429)
      .json(
        'Too many requests in 1 minute. Please try again in a few minutes.'
      );
    return;
  }
  // not throttled?
  // query redis first
  else
    try {
      checkRedis = await fetch(`/getMetrics/${params.url}`);
      if (existsInRedisCache) {
        return res.json({ res });
      }

      // redis returned false?
      // query sql
      try {
        checkSQL = await fetch(`/sql-db/retrieve/${params.url}`);
        if (existsInSQLDatabase) {
          return res.json({ res });
        }

        // SQL returned false?
        // query chatgpt
        try {
          queryGPT = await chatGPTMiddleware(params);
          // chatGPT response good ?
          if (queryGPT) {
            // save redis, pass URL and GPT data
            try {
            } catch (err) {
              console.log('Error in saving to Redis', err);
            }
            // save sql
            try {
              const SQLPostReqBody = { url: params.url };
              const SQLSave = fetch(`/sql-db/save/`, {
                method: 'post',
                body: JSON.stringify(SQLPostReqBody),
                headers: { 'Content-Type': 'application/json' },
              });
              console.log(SQLSave);
            } catch (err) {
              console.log('Error in saving to SQL', err);
            }
            // return response
            return res.json({ res });
          }
        } catch (err) {
          console.log('Error in chatGPTMiddleware', err);
        }
      } catch (err) {
        console.log('Error fetching /sql-db/retrieve/', err);
      }
    } catch (err) {
      console.log('Error fetching /getMetrics/', err);
    }
}
