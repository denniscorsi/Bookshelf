const authRouter = require('express').Router();
const authController = require('../controllers/authController');

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
