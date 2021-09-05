const express = require('express');
const router = express.Router();
const Coffee = require("../models/Coffee");

const { getAll , getById , updateById , deleteById, create } = require('../controllers/coffeeController');


router.post('/' , create )
router.get('/' , getAll)
router.get('/:id' , getById)
router.delete('/:id' ,  deleteById)
router.put('/:id' ,updateById)



module.exports = router;