const express = require("express");

const cohortsRouter = require('./cohorts/cohorts-router')
const studentsRouter = require('./students/students-router')

const server = express();

// Global Middleware
server.use(express.json())

// Routes
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;