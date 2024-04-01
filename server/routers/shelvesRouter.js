const express = require("express");
const shelvesRouter = express.Router();

const shelvesController = require("../controllers/shelvesController");

shelvesRouter.get("/", shelvesController.getUserShelves, (req, res) => {
  res.status(200).json(res.locals.shelves);
});

shelvesRouter.post("/", shelvesController.addToShelf, (req, res) => {
  res.status(200).end();
});

module.exports = shelvesRouter;
