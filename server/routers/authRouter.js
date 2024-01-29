const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);



// post: login

authRouter.post(
  '/register',
  authController.register,
  authController.createSession,
  (req, res) => {
    res.status().send();
  }
);

module.exports = authRouter;
