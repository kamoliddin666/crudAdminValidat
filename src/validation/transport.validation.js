import Joi from "joi"

export const createTransportValidator = (data) =>{
    const transport = Joi.object({
        transport_type: Joi.string().valid('bus', 'train', 'plane').required(),
        class: Joi.string().valid('economy', 'business', 'premium').required(),
        seat: Joi.number().integer().min(1).required()
    })
    return transport.validate(data)
}
export const updateTransportValidator = (data) =>{
    const transport = Joi.object({
        transport_type: Joi.string().valid('bus', 'train', 'plane').optional(),
        class: Joi.string().valid('economy', 'business', 'premium').optional(),
        seat: Joi.number().integer().min(1).optional()
    })

    return transport.validate(data)
}