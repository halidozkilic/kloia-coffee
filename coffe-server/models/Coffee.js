const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoffeeSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    ingredients: {
        type: Array,
        items: {
            type: String,
            enum: ["iced", "hot"],
        },
    },
},{ timestamps: {createdAt: 'createdTime', updatedAt: 'updatedTime'}
});

module.exports = mongoose.model('Coffee', CoffeeSchema);