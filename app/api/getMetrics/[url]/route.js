//import { NextResponse } from "next/server";
import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import * as redis from 'redis';
config(); //loads env variables

export async function GET(req) {
  //CLEANING UP THE req input LOGIC START
  //CLEANING UP THE req input LOGIC START
  //CLEANING UP THE req input LOGIC START
  const { url } = req;

  let finalUrl;
  // parse incomeing url to either add or replace starting with https://
  if (url.slice(0, 7) === "http://") {
    finalUrl = "https://" + url.slice(8);
  } else if (url.slice(0, 8) !== "https://") {
    finalUrl = "https://" + url;
  } else {
    finalUrl = url;
  }

  let tmpArr = finalUrl.match(/getMetrics\/(.*)/);
  let websiteInput = "https://" + tmpArr[1] //input used for chatgpt AND redis check if cached
  //CLEANING UP THE req input LOGIC END
  //CLEANING UP THE req input LOGIC END
  //CLEANING UP THE req input LOGIC END



  //REDIS CACHE LOGIC START
  //REDIS CACHE LOGIC START
  //REDIS CACHE LOGIC START
  let cacheExist = false;
  let redisPort = 6379;  // Replace with your redis port
  let redisHost = "127.0.0.1";  // Replace with your redis host
  let redisClient;
  (async () => {
    redisClient = redis.createClient({
        socket: {
        port: redisPort,
        host: redisHost,
        }
    });
    redisClient.on("error", (error) => console.error(`Error HERE WE ARE: ${error}`));
    await redisClient.connect();
  })();
  //check if cache exists
  const cacheResults = await redisClient.get(websiteInput);
  let cacheResultsFinal;
  if (cacheResults) {
    cacheExist = true;
    cacheResultsFinal = JSON.parse(cacheResults);
  }
  //REDIS CACHE LOGIC END
  //REDIS CACHE LOGIC END
  //REDIS CACHE LOGIC END



  //CHATGPT LOGIC START
  //CHATGPT LOGIC START
  //CHATGPT LOGIC START
  //CHATGPT LOGIC START
  // don't forget to create ".env" file with the line "OPENAI_API_KEY=your_secret_key here"
  const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  async function chat(prompt, setup) {
      const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
          { role: "system", content: setup },
          {
          role: "user",
          content: prompt,
          },
      ],
      });
      // extract the answer from response
      const answer = response.data.choices[0].message.content;
      return answer;
  }
  //CHATGPT LOGIC END
  //CHATGPT LOGIC END
  //CHATGPT LOGIC END

  
  //FINALIZE to choose between cached or not cacched LOGIC START
  //FINALIZE to choose between cached or not cacched LOGIC START
  //FINALIZE to choose between cached or not cacched LOGIC START
  let output;
  if (cacheExist){
    console.log('cached', cacheResultsFinal) //check if chatgpt output is available
    return new Response(websiteInput + " cached " + cacheResultsFinal);
  } else  {
    const setup = `Answer as a UX designer`;
    const valueInput = "1+1+5" //INPUT YOUR DATA HERE
    const prompt = `Can you analyze this? ${valueInput}`;
    output = await chat(setup, prompt)
    console.log('chatgpt not cached', output) //check if chatgpt output is available
    await redisClient.set(websiteInput, JSON.stringify(output), {
        EX: 180,
        NX: true,
    });
    return new Response(websiteInput + " not cached" + output);
  }
  //FINALIZE to choose between cached or not cacched LOGIC END
  //FINALIZE to choose between cached or not cacched LOGIC END
  //FINALIZE to choose between cached or not cacched LOGIC END
}
