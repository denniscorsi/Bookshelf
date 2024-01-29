const bcrypt = require('bcryptjs');

const authController = {};

authController.register = (req, res, next) => {
  const {username, email, password} = req.body;

  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = {
    username,
    email,
    password: hashedPass
  }

}

authController.createSession = (req, res, next) => {
  
}


module.exports = authController;