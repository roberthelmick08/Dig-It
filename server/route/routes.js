const express = require('express');
var router = express.Router();

// Retrieve all plants from database
router.get('/search', (req, res) => {
    res.send('get all plants from DB');
});

module.exports = router;