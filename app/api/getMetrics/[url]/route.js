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
  let urlPlain = tmpArr[1]
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
    cacheResultsFinal = await JSON.parse(cacheResults);
  }
  //REDIS CACHE LOGIC END
  //REDIS CACHE LOGIC END
  //REDIS CACHE LOGIC END

  //getting the json file from the lighthouse route in express
  //getting the json file from the lighthouse route in express
  //getting the json file from the lighthouse route in express
  console.log('cache exist', cacheExist)
  let lighthouseOutput;
  //if (cacheExist) { 
    console.log('cache does not exists')
    lighthouseOutput = await fetch('http://localhost:4000/lighthouse?url='+ urlPlain) //need try catch logic
    lighthouseOutput = await lighthouseOutput.json()
  // } else {
  //   console.log('cache exists')
  //   console.log(cacheResultsFinal)
  //   lighthouseOutput = cacheResultsFinal.lighthouseOutput;
  // }

  const {firstContentfulPaint
    ,totalBlockingTime
    ,largestContentfulPaint
    ,buttonName
    ,imageAlt
    ,linkName
    ,colorContrast
    ,fontSize} = lighthouseOutput;

  //create prompt for chatgpt start
  const prompt = `Generate a 1-10 score for overall performance of a website based on the following metrics: First Contentful Paint (firstContentfulPaint), Total Blocking Time (totalBlockingTime), Largest Contentful Paint (largestContentfulPaint).
  Generate a 1-10 score for overall accessibility of a website based on the following metrics: buttons without names (buttonName), images without alt tags (imageAlt), links without names (linkName), elements with poor color contrast (colorContrast).
  Generate a 1-10 score for SEO of a website based on the following metrics: percentage of document with legible font sizes (fontSize).
  Get the above metrics in the following object:
  {
    firstContentfulPaint: '${firstContentfulPaint}',
    totalBlockingTime: '${totalBlockingTime}',
    largestContentfulPaint: '${largestContentfulPaint}',
    buttonName: '${buttonName}',
    imageAlt: '${imageAlt}',
    linkName: '${linkName}',
    colorContrast: '${colorContrast}',
    fontSize: '${fontSize}'
  }
  Give the 3 1-10 scores back in the format of an array of only numbers, do not include descriptions for the array. Then give me a high-level overview of how this website compares to other websites in three sentences only.`
  //create prompt for chatgpt end

  console.log(prompt)


  //getting the json file from the lighthouse route in express END
  //getting the json file from the lighthouse route in express END
  //getting the json file from the lighthouse route in express END
  

  

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
    return new Response(websiteInput + " cached " + JSON.stringify(cacheResultsFinal));
  } else  {
    const setup = `Answer as a UX designer`;
    output = await chat(setup, prompt)
    let store = {output, lighthouseOutput}
    console.log('chatgpt not cached', store) //check if chatgpt output is available
    await redisClient.set(websiteInput, JSON.stringify(store), {
        EX: 180,
        NX: true,
    });
    return new Response(websiteInput + " not cached" + JSON.stringify(store));
  }
  //FINALIZE to choose between cached or not cacched LOGIC END
  //FINALIZE to choose between cached or not cacched LOGIC END
  //FINALIZE to choose between cached or not cacched LOGIC END
}
