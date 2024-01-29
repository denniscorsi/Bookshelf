const authRouter = require('express').Router();
const authController = require('../controllers/authController');

// post: login

authRouter.post(
  '/register',
  authController.register,
  // authController.createSession,
  (req, res) => {
    res.status().json({ ok: true, message: 'User successfully registered' });
  }
);

module.exports = authRouter;
