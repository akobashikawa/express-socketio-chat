const express = require('express');
const router = express.Router();

const messages = [];

/* POST message */
router.post('/messages', function(req, res, next) {
  const message = req.body.message;
  messages.push(message);
  res.json(messages);
});

module.exports = router;
