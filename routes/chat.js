const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {
    res.send('chat is running')
});

module.exports = router;