const authRouter = require('express').Router();
const authController = require('../controllers/authController');

// post: login

authRouter.post(
  '/register',
  authController.register,
  authController.createSession,
  (req, res) => {
    res.status(201).json({ ok: true, message: 'User successfully registered' });
  }
);

authRouter.post(
  '/login',
  authController.login,
  authController.createSession,
  (req, res) => {
    res.status(201).json({ ok: true, message: 'User successfully logged in' });
  }
);

module.exports = authRouter;
