const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const JoiSchema = Joi.object({
        firstName: Joi.string()
            .min(2)
            .required(),
        otherNames: Joi.string(),
        storeName: Joi.string(),
        phone: Joi.string()
            .required(),
        email: Joi.string(),
        address: Joi.any(),
        password: Joi.string()
            .required()
    }).options({abortEarly: false})

    
    return JoiSchema.validate(data);

}

const loginValidation = data => {

    const JoiSchema = Joi.object({
        
        phone: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    });

    return JoiSchema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;