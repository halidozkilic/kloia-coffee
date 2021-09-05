const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {coffeeCategoryEnum} = require('../def/coffeeDefinition')
const CoffeeSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: [coffeeCategoryEnum.iced,coffeeCategoryEnum.hot],
        required:true
    },
    ingredients: {
        type: Array
    },
},{ timestamps: {createdAt: 'createdTime', updatedAt: 'updatedTime'}
});

module.exports = mongoose.model('Coffee', CoffeeSchema);