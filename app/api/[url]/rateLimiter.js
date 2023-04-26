import { createClient } from 'redis';

// set max requests per x seconds
const requestLimit = 1,
  requestDuration = 30,
  redisClient = createClient({
    url: `redis://default:LECMT4nsoTrUfWvRh0wtzlkZRRIXGWfX@${process.env.REDIS_RATE_LIMITER}`,
  });

export default async function rateLimiter(ip) {
  // req.ip is returning undefined currently, localhost issue?
  if (typeof ip === 'undefined') {
    ip = 1234;
  }

  try {
    await redisClient.connect();
    // define client key to track requests made by ip
    const key = `rate_limit:${ip}`,
      keyTTL = await redisClient.ttl(key);

    // Set a timeout on key in seconds. After the timeout has expired, the key will automatically be deleted.
    if (keyTTL <= 1) {
      redisClient.expire(key, requestDuration);
    }

    // Increments the key (request count) by one. If the key does not exist, it is set to 0 before performing the operation.
    // get current client key/request count from Redis instance
    const requestCount = await redisClient.incr(key);
    await redisClient.disconnect();

    if (requestCount > requestLimit) {
      console.log(`Rate limiter detected too many requests from IP ${ip}!`);
      return new Response ({
        requestLimit,
        requestDuration,
        requestCount,
        success: false,
      });
    }

    return new Response ({
      requestLimit,
      requestDuration,
      requestCount,
      success: true,
    });
  } catch (err) {
    console.log('Error in ratelimiter', err);
  }
}
