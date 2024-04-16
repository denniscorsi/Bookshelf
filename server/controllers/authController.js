const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Session = require("../models/sessionModel");
const { SESSION_LENGTH } = require("../../constants");

const authController = {};

authController.register = async (req, res, next) => {
  const { username, email, password } = req.body.user;

  console.log("entered register");

  // Make sure username or email don't already exist
  let foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.status(409).json({ ok: false, message: "User already exists" });
  }

  foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(409).json({ ok: false, message: "User already exists" });
  }

  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = {
    username,
    email,
    password: hashedPass
  };

  // Create new user
  User.create(user).then(
    (newUser) => {
      console.log("Created new user:", newUser);
      res.cookie("username", username, { httpOnly: true });
      return next();
    },
    (err) => {
      return next({
        log: "Error creating new user in database",
        message: {
          err: "creating a new user in MongoDB failed in authController.register"
        }
      });
    }
  );
};

authController.login = async (req, res, next) => {
  const { username, password } = req.body.user;

  console.log("entered login");

  // Make sure username or email don't already exist
  let foundUser = await User.findOne({ username });
  if (foundUser) {
    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (!result) {
        return res.status(401).json({ ok: false, message: "Invalid credentials" });
      } else {
        console.log("found!");
        res.cookie("username", username);
        return next();
      }
    });
  } else {
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }
};

authController.createSession = (req, res, next) => {
  const ssid = Math.floor(Math.random() * 1000000);
  const session = Session.create({ ssid }).then(
    (newSession) => {
      console.log("Created session", newSession);
      res.cookie("ssid", ssid, { maxAge: SESSION_LENGTH, httpOnly: true });
      return next();
    },
    (err) => {
      return next({
        log: "Error creating new session in database",
        message: {
          err: "creating a new session in MongoDB failed in authController.createSession"
        }
      });
    }
  );
};

authController.validateSession = async (req, res, next) => {
  console.log("entered validate session");

  const { username, ssid } = req.cookies;

  //TODO: change the invalid response so that routes that are expecting a certain response can handle this
  // perhaps ok: false

  if (!username || !ssid) return res.status(200).json(false);

  const session = await Session.findOne({ ssid });
  if (!session) return res.status(200).json(false);

  res.locals.username = username;
  return next();
};

module.exports = authController;
