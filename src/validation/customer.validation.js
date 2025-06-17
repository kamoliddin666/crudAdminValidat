import Joi from "joi"

export const createCustomerValidation = (data)=>{
    const customer = Joi.object({
        email: Joi.string().email().required(),
        phone_number: Joi.string().regex(/^\+9989[0-9]{8}$/).required(),
    });
    return customer.validate(data)
}
export const updateCustomerValidation = (data)=>{
    const customer = Joi.object({
        email: Joi.string().email().optional(),
        phone_number: Joi.string().regex(/^\+9989[0-9]{8}$/).optional(),
    });
    return customer.validate(data)
}