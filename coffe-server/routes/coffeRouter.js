const express = require('express');
const router = express.Router();
const Coffee = require("../models/Coffee");

const { getAll , getById , updateById , deleteById, create , search } = require('../controllers/coffeeController');
const {Validate} = require('../middleware/validate')
const {coffeeDef} = require('../def/coffeeDefinition')

router.post('/' ,Validate([coffeeDef.title,coffeeDef.category]) , create )
router.get('/' , getAll)
router.get('/:id' , getById)
router.delete('/:id',  deleteById)
router.put('/:id' , Validate([coffeeDef.title,coffeeDef.category,coffeeDef.description,coffeeDef.ingredients]) ,updateById)
router.get('/search/:query', search)


module.exports = router;