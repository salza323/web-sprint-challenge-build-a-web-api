const express = require('express');
const router = express.Router();

const Projects = require('./projectModel');
const Actions = require('../action/actionModel');

//endpoints here

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
