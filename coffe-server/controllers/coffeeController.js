const Coffee = require('../models/Coffee');

const getAll = async (req, res, next) => {
    try {
        const allCoffies = await Coffee.find();
        res.status(200).json({code: 200,success: true, allCoffies: allCoffies});
    }catch (e){
        return res.status(201).json({code: 201,message:"something went wrong",error:e})
    }
}

const getById = async (req,res,next) => {
    try {
        const coffee = await Coffee.findOne({
            _id:req.params.id,
        })
        res.status(200).json({code: 200,success: true,message:'A Coffee Response', coffee: coffee});
    }catch (e){
        return res.status(404).json({code: 404,message:"Not Found",error:e})
    }
}

const updateById = async (req,res,next) => {
    const data = req.body;
    if(!data.title && !data.description && !data.ingredients ){
        return res.status(400).json({code: 400,message:"Invalid Input"})
    }
    try {
        const coffee = await Coffee.findOneAndUpdate({
            _id:req.params.id,
        },{ $set:
                { ingredients:data.ingredients,
                    title: data.title,
                    description: data.description
                }
        });

        res.status(200).json({code: 200,success: true,message:"Updated a single coffee", updatedCoffee: coffee});
    }catch (e){
        return res.status(404).json({code: 404,message:"Not Found",error:e})
    }
}

const deleteById = async (req,res,next) => {
    try {
        const coffee = await Coffee.findOneAndRemove({
            _id:req.params.id,
        })
        res.status(200).json({code: 200,success: true,message:"Deletes a single coffee", deletedCoffee: coffee});
    }catch (e){
        return res.status(404).json({code: 404,message:"Not Found",error:e})
    }
}

const create = async(req,res,next) => {
    const data = req.body;
    if(!data.title || !data.description){
        return res.status(400).json({code:400, message: 'invalid input'});
    }

    try {
        const newCoffee = new Coffee({
            title:data.title,
            description:data.description,
            ingredients:data.ingredients,
            category:data.category,
        })
        const cff = await newCoffee.save();
        return res.status(200).json({code: 200,message:"Coffee object to be created",coffee:cff})
    }catch (e){
        return res.status(201).json({code: 201,message:"something went wrong",error:e})
    }
}

module.exports = { getAll, getById, updateById, deleteById, create };