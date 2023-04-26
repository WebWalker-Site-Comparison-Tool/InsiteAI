//import { NextResponse } from "next/server";
import { config } from 'dotenv';
import * as axios from 'axios'
import { Configuration, OpenAIApi } from 'openai';
// import * as redis from 'redis';
config(); //loads env variables

export async function GET(req) {

  //THIS NEEDS TO CHANGE when cache exists
  let cacheExist = false;
  
  //this variable is where we store the data from lighthouse, weather it be from lighthouse or cache
  let lighthouseOutput;

  // //CLEANING UP THE req input LOGIC START
  // //CLEANING UP THE req input LOGIC START
  // //CLEANING UP THE req input LOGIC START
 
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

  //this variable is used to check redis database
  let websiteInput = "https://" + tmpArr[1]
  // //CLEANING UP THE req input LOGIC END
  // //CLEANING UP THE req input LOGIC END
  // //CLEANING UP THE req input LOGIC END


  //REDIS CACHE LOGIC START
  //REDIS CACHE LOGIC START
  //REDIS CACHE LOGIC START
  //
  //IMPORTANT
  //PUT LOGIC IF CACHE EXISTS HERE websiteInput is an important variable for this block
  //IMPORTANT
  //
  //REDIS CACHE LOGIC END
  //REDIS CACHE LOGIC END
  //REDIS CACHE LOGIC END




  //getting the json file from the lighthouse route in express
  //getting the json file from the lighthouse route in express
  //getting the json file from the lighthouse route in express
  // console.log('CACHE EXISTS VARIABLE VALUE:', cacheExist)
  if (cacheExist===false) {
    lighthouseOutput = await axios.get('http://localhost:4000/lighthouse?url='+ urlPlain) //need try catch logic
    lighthouseOutput = lighthouseOutput.data
  }
  //getting the json file from the lighthouse route in express END
  //getting the json file from the lighthouse route in express END
  //getting the json file from the lighthouse route in express END



  //CREATE PROMPT for chatgpt START
  //CREATE PROMPT for chatgpt START
  //CREATE PROMPT for chatgpt START
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
  //CREATE PROMPT for chatgpt END
  //CREATE PROMPT for chatgpt END
  //CREATE PROMPT for chatgpt END


  //CHATGPT pull results from chatgpt
  if (cacheExist===false){
    try {
      let chatGPTOutput = await axios.put('http://127.0.0.1:3000/api/chatgpt', { prompt });
      chatGPTOutput = chatGPTOutput.data;
    } catch (error) {
      console.log('error in getmetrics', error)
      return new Response('error in fetch of chatgpt');
    }
  }
  //FINALIZE to choose between cached or not cacched LOGIC START
  //FINALIZE to choose between cached or not cacched LOGIC START
  //FINALIZE to choose between cached or not cacched LOGIC START
  if (cacheExist){
    //
    //IMPORTANT
    //REDIS LOGIC TO PULL RESULTS???
    //IMPORTANT
    //
    return new Response('PUT HERE CACHED OUTPUT');
  } else {
    let storedOutput = {chatGPTOutput, lighthouseOutput}
    //
    //IMPORTANT
    //REDIS LOGIC TO CACHE RESULTS
    //IMPORTANT
    //
    //
    console.log('NOT CACHED')
    return new Response(JSON.stringify(storedOutput));
  }
  //FINALIZE to choose between cached or not cached LOGIC END
  //FINALIZE to choose between cached or not cached LOGIC END
  //FINALIZE to choose between cached or not cached LOGIC END
}
