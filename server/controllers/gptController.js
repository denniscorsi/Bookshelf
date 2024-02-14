const OpenAI = require('openai');
require('dotenv').config();

const gptController = {};

// gets a recommendation from chatGPT, based on a single book
gptController.findRec = async (req, res, next) => {

  console.log('CHATGPT REQUEST!');
  const { title } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.GPT_KEY,
  });

  const GPTresponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful librarian. ',
      },
      {
        role: 'user',
        content: `Please recommend one book that I would like, knowing that I liked the book "${title}". Begin your response with just the title of the book. Then explain why I'd like this book based on enjoying ${title} Respond with less than 65 words.`,
      },
    ],
    temperature: 1,
    max_tokens: 120,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.locals.GPTresponse = GPTresponse;
  return next();
};

// gets a recommendation from chatGPT, based on array of likes
gptController.findGeneralRec = async (req, res, next) => {
  // console.log('STOPPIN GENERAL REC REQUEST');
  // return next('not yet!');
  console.log('CHATGPT REQUEST!');
  //favBooks will be an array of books the user likes.
  let { favBooks } = req.body;
  console.log(favBooks);
  favBooks = favBooks.toString();

  const openai = new OpenAI({
    apiKey: process.env.GPT_KEY,
  });

  const GPTresponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful librarian. ',
      },
      {
        role: 'user',
        content: `Please recommend one book that I would like, knowing that I liked the following books: ${favBooks}. Begin your response with just the name of the book. Then explain why I'd enjoy this book based on the books I liked. Respond with less than 90 words.`,
      },
    ],
    temperature: 1,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.locals.GPTresponse = GPTresponse;
  return next();
};

// pull the title and message out of the chatGPT response
gptController.unpackRec = (req, res, next) => {
  const { GPTresponse } = res.locals;

  // this is the actual text response
  const GPTbody = GPTresponse.choices[0].message.content;
  console.log('RESPONSE: ', GPTbody);
  res.locals.fullRec = GPTbody;

  // this finds the word "by" and assumes the title is everything before that
  // ChatGPT was asked to repond with the title of the book first, so we know that is coming first
  let title = '';
  for (let i = 0; i < 100; i++) {
    if (GPTbody[i] === 'b' && GPTbody[i + 1] === 'y') {
      title = GPTbody.slice(0, i - 1);
      break;
    }
  }
  console.log('TITLE:', title);

  res.locals.title = title;
  next();
};

module.exports = gptController;
