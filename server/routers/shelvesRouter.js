const express = require("express");
const shelvesRouter = express.Router();

const shelvesController = require("../controllers/shelvesController");
const userController = require("../controllers/userController");

shelvesRouter.get("/", shelvesController.getUserShelves, (req, res) => {
  res.status(200).json(res.locals.shelves);
});

// This adds a book to a shelf, then adds that book to a user's bookData
shelvesRouter.post(
  "/",
  userController.loadUser,
  shelvesController.addToShelf,
  userController.intializeBookData,
  (req, res) => {
    res.status(200).end();
  }
);

module.exports = shelvesRouter;
