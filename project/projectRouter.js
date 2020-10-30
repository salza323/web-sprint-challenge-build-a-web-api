const express = require('express');
const router = express.Router();

const Projects = require('./projectModel');
const Actions = require('../action/actionModel');
const { getProjectActions } = require('./projectModel');

//middleware

const validateId = (req, res, next) => {
  const { id } = req.params;

  Projects.get(id)
    .then((data) => {
      if (data) {
        req.project = data;
        next();
      } else {
        next({ code: 400, message: 'There is no project with id ' + id });
      }
    })
    .catch((error) => {
      console.log(error.message);
      next({ code: 500, message: 'no a valid request' });
    });
};

//endpoints here

router.get('/:id', validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project',
      });
    });
});

router.put('/:id', (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project does not exist' });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
});

router.delete('/:id', validateId, (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      res.status(200).json({ message: 'The project has been deleted' });
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error deleting the project',
      });
    });
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
