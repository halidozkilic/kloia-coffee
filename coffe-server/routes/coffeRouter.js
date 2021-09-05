const express = require('express');
const router = express.Router();
const Coffe = require("../models/Coffee");


router.get('/ping', (req, res) => {
  return res.status(200).json('ping success');
})



module.exports = router;