const express = require('express');
// const helmet = require('helmet')
const morgan = require('morgan');

const actionRouter = require('./action/actionRouter');
const projectRouter = require('./project/projectRouter');

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Sals API</h2>
  `);
});

server.use((error, req, res, next) => {
  res.status(500).json({ message: error });
});

module.exports = server;
