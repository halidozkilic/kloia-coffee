const {coffeeCategoryEnum, coffeeDef} = require('../def/coffeeDefinition')

const Validate = (params) => {
    return (req, res, next) => {
        const data = req.body;
        let errors = []
        for (let i in params){
            if (!data[params[i]]) errors.push(params[i])
            if (params[i] === coffeeDef.category && !(data[params[i]] in [coffeeCategoryEnum.iced,coffeeCategoryEnum.hot])) {
                errors.push('category must be iced or hot')
            }
        }
        if (errors.length>0){
            return res.status(400).json({code: 400, message: "Invalid Input", requiredField:errors})
        }
        next();
    }
}

module.exports = {Validate};