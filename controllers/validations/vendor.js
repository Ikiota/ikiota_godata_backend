const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const JoiSchema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .required(),
        otherNames: Joi.string()
            .min(3)
            .required(),
        storeName: Joi.string()
            .min(6)
            .required(),
        idNat: Joi.string()
            .min(4)
            .required(),
            
        phone: Joi.string()
            .required()
            .min(10),
        address: Joi.any()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    }).options({abortEarly: false})

    
    return JoiSchema.validate(data);

}

const loginValidation = data => {

    const JoiSchema = Joi.object({
        
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });

    return JoiSchema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;