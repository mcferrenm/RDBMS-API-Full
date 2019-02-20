const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig);
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Students API");
});

module.exports = router;
