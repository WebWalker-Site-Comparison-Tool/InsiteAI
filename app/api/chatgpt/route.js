const { config } = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
// const { redis } = require("redis");
config();

export async function PUT(req) {

    req = await req.json()

    let setup = `Answer as a UX designer`
    let prompt = req.prompt

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

    let chatGPTOutput = await chat(setup, prompt)

    return new Response(JSON.stringify(chatGPTOutput));

}