
//EXPRESS SERVER CODE HERE
const express = require('express');
const { chatGPTMiddleware } = require('./middleware/chatGPTMiddleware.js');  
const app = express();

app.use(express.json());
app.use('/chat', chatGPTMiddleware, (req, res, next) => {
  const response = "test"
  res.json({ message: response });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



//REDIS CODE
const redis = require("redis");

let redisPort = 6379;  // Replace with your redis port
let redisHost = "127.0.0.1";  // Replace with your redis host
const client = redis.createClient({
    socket: {
      port: redisPort,
      host: redisHost,
    }
  });

(async () => {
    // Connect to redis server
    await client.connect();
})();


console.log("Attempting to connect to redis");
client.on('connect', () => {
    console.log('Connected!');
});

// Log any error that may occur to the console
client.on("error", (err) => {
    console.log(`Error:${err}`);
});

// Close the connection when there is an interrupt sent from keyboard
process.on('SIGINT', () => {
    client.quit();
    console.log('redis client quit');
});