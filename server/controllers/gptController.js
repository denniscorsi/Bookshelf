const OpenAI = require('openai');
require('dotenv').config();

const gptController = {};

// gets a recommendation from chatGPT, based on a single book
gptController.findRec = async (req, res, next) => {
  console.log('CHATGPT REQUEST!');
  const { title } = req.body;

  try {
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
          content: `Please recommend one book that I would like, knowing that I liked the book "${title}". Respond in JSON in the following format: {"title":<title>, "justification":<why you think I'd like the book>}. Respond with less than 75 words.`,
        },
      ],
      temperature: 1,
      max_tokens: 120,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log('GPTresponse', GPTresponse);
    res.locals.GPTresponse = GPTresponse;
    return next();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// gets a recommendation from chatGPT, based on array of likes
gptController.findGeneralRec = async (req, res, next) => {
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
        content: `Please recommend one book that I would like, knowing that I liked the following books: ${favBooks}. Respond in JSON in the following format: {"title":<title>, "justification":<why you think I'd like the book>}. Respond with less than 80 words.`,
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
  console.log('entered unpack');

  try {
    // this is the actual text response
    const GPTbody = GPTresponse.choices[0].message.content;
    console.log('RESPONSE: ', GPTbody);
    console.log('Type:', typeof GPTbody);
    const rec = JSON.parse(GPTbody);
    console.log('rec:', rec);
    res.locals.title = rec.title;
    res.locals.justification = rec.justification;
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = gptController;
