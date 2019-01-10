const express = require('express');
const router = express.Router();

// User router
router.route('/users')
  .get((req, res) => {
    res.json({method: 'get all'});
  })

  .post((req, res) => {
    res.json({method: 'post new', data: req.body});
  });

router.route('/user/:id')
  .get((req, res) => {
    res.json({method: 'get single', id: req.params.id});
  })

  .put((req, res) => {
    res.json({method: 'put', id: req.params.id, data: req.body});
  })

  .delete((req, res) => {
    res.json({method: 'delete', id: req.params.id});
  })

module.exports = router;