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

// router.get('/api/actions/:id', (req, res) => {
//   const { id } = req.paraams;
//   Actions.get(id)
//     .then((actions) => {
//       res.status(200).json(actions);
//     })
//     .catch((error) => {
//       // log error to server
//       console.log(error);
//       res.status(500).json({
//         message: 'Error retrieving the actions',
//       });
//     });
// });

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
