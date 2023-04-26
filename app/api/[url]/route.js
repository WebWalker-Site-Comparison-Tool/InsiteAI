import rateLimiter from './rateLimiter';

let checkRedis, checkSQL, queryGPThouse;

export async function GET(req) {
  // throttle based on client IP & requests per 30 seconds
  const limit = await rateLimiter(req.ip);
  
  const url = req.url.slice(request.url.lastIndexOf('/')+1);

  // throttled? connection refused
  if (!limit.success) {
    return new Response('Too many requests in 1 minute. Please try again in a few minutes.');
  }
  // not throttled?

  // query redis first
  else
    try {
      let finalUrl;

      if (url.slice(0, 7) === 'http://') {
          finalUrl = 'https://' + url.slice(7);
      } else if (url.slice(0, 8) !== 'https://') {
          finalUrl = 'https://' + url;
      } else {
          finalUrl = url;
      }

      checkRedis = await fetch(`/getMetrics/${finalUrl}`);
      if (checkRedis) {
        return new Response (checkRedis);
      }
      // redis returned false?
      // query sql
      try {
        checkSQL = await fetch(`/sql-db/retrieve/${finalUrl}`);
        if (checkSQL) {
          return new Response(checkSQL);
        }

        // QUERY CHATGPT SPEAK W ANSEL & AUSTIN
        try {
          queryGPThouse = await chatGPTMiddleware(params);
          // chatGPT response good ?
          if (queryGPThouse) {
            // save redis, pass URL and GPT data

            // save sql
            try {
              const SQLSave = fetch(`/sql-db/save/`, {
                method: 'post',
                body: JSON.stringify(queryGPThouse),
                headers: { 'Content-Type': 'application/json' },
              });
              console.log(SQLSave);
            } catch (err) {
              console.log('Error in saving to SQL', err);
            }
            // return response
            return new Response(SQLSave);
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
