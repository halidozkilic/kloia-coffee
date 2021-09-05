const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

router.get('/ping', (req, res) => {
  return res.status(201).json("ping success");
})

module.exports = router