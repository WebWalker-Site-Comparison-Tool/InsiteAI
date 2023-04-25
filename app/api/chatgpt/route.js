const { config } = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const { redis } = require("redis");
config();

export async function GET(request) {

    let cacheExist = false;


    const redis = require("redis");

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

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
    })();

    //set query params here
    const queryParams = 'https://www.example.com';

    //check if cache exists
    const cacheResults = await redisClient.get(queryParams);
    let cacheResultsFinal;
    if (cacheResults) {
      cacheExist = true;
      cacheResultsFinal = JSON.parse(cacheResults);
    }


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
    
    //this will probably be changed into the code needed to create the JSON output
    async function printResponse() {
        var htmlCode;
        await fetch('https://www.example.com') //change this to change the website
        .then(response => response.text())
        .then(html => {
            htmlCode = html
            //console.log(htmlCode)
        })
        .catch(error => console.error(error));
    
        const setup = `Answer as a UX designer`;
        const prompt = `can you assess the accessibility for disabled people of this html code? ${htmlCode}`;
    
        const result = await chat(prompt, setup)
        //setInterval(async ()=>{console.log(await chat(prompt, setup))}, 3000);
        return result;
    }

    
    let output;
    if (cacheExist){
        return new Response("https://www.example.com cached " + cacheResultsFinal);
    } else  {
        output = await printResponse()
        await redisClient.set('https://www.example.com', JSON.stringify(output), {
            EX: 180,
            NX: true,
        });
        return new Response("https://www.example.com not cached " + output);
    }
    
}