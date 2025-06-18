import Joi from "joi"


export const signUpCustomerValidator = (data)=>{
    const customer = Joi.object({
        email: Joi.string().email().required(),
        phone_number: Joi.string().regex(/^\+9989[0-9]{8}$/).required(),
    });
    return customer.validate(data)
}

export const signInCustomerValidator = (data) =>{
    const customer = Joi.object({
        email: Joi.string().email().required()
        
    });
    return customer.validate(data)
}

export const confirmSignInCustomerValidator = (data) => {
    const customer = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required()
    })
    return customer.validate(data)
}

export const updateCustomerValidation = (data)=>{
    const customer = Joi.object({
        email: Joi.string().email().optional(),
        phone_number: Joi.string().regex(/^\+9989[0-9]{8}$/).optional(),
    });
    return customer.validate(data)
}