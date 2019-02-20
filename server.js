const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile");
const cohortsRouter = require('./cohorts/cohorts-router')
const studentsRouter = require('./students/students-router')

const db = knex(knexConfig);
const server = express();

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;