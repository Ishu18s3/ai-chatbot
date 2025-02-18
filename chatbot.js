require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const { rl } = require('./rl');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function chat() {
  rl.question('You: ', async function (userInput) {
      try {
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: userInput,
          max_tokens: 150,
          temperature: 0.7,
        });
        console.log('Bot:', response.data.choices[0].text.trim());
      } catch (error) {
        console.error('Error:', error);
      }
      chat();
    });
}

chat();

