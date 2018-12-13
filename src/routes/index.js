const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/state', function(req, res, next) {
  res.json({
    switches:[
      {
        id: "Switch1",
        state: 0
      },
      {
        id: "Switch2",
        state: 0
      },
      {
        id: "Switch3",
        state: 0
      }
    ],
    lights:[
      {
        id: "Blue",
        state: 1
      },
      {
        id: "Yellow",
        state: 0
      },
      {
        id: "Green",
        state: 1
      }
    ]
  });
});


module.exports = router;
