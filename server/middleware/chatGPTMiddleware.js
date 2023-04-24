const { config } = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
config();

const chatGPTMiddleware = async (req, res, next) => {

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // don't forget to create ".env" file with the line "OPENAI_API_KEY=your_secret_key here"
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
  
  async function printResponse() {
    var htmlCode;
    await fetch('https://www.example.com')
      .then(response => response.text())
      .then(html => {
        htmlCode = html
        //console.log(htmlCode)
      })
      .catch(error => console.error(error));
  
    const setup = `Answer as a UX designer`;
    const prompt = `can you assess the accessibility for disabled people of this html code? ${htmlCode}`;
  
    console.log(prompt)
  
    //setInterval(async ()=>{console.log(await chat(prompt, setup))}, 3000);
    console.log(await chat(prompt, setup))
  }
  
  printResponse();

  return next();
}


// Export the middleware function
module.exports = { chatGPTMiddleware };
