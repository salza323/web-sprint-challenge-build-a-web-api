const express = require('express');
const router = express.Router();

const Projects = require('../project/projectModel');
const Actions = require('./actionModel');

//middleware

const validateId = (req, res, next) => {
  const { id } = req.params;

  Actions.get(id)
    .then((data) => {
      if (data) {
        req.action = data;
        next();
      } else {
        next({ code: 400, message: 'There is no action with id ' + id });
      }
    })
    .catch((error) => {
      console.log(error.message);
      next({ code: 500, message: 'no a valid request' });
    });
};

//endpoints here

router.get('/:id', validateId, (req, res) => {
  res.status(200).json(req.action);
});

router.post('/', (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the action',
      });
    });
});

router.put('/:id', (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'The action does not exist' });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the action',
      });
    });
});

router.delete('/:id', validateId, (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      res.status(200).json({ message: 'The action has been deleted' });
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error deleting the action',
      });
    });
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
