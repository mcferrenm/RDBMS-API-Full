const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile");

const server = express();

const PORT = process.env.PORT || 8000;

const db = knex(knexConfig);

server.listen(PORT, () => {
  console.log(`\n\n*** Now listening on port ${PORT} ***\n`);
})
