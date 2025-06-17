import Joi from "joi"

export const createTicketValidation = (data) =>{
    const ticket = Joi.object({
        customer_id: Joi.string().required(),
        transport_id: Joi.string().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
        price: Joi.number().required().min(0),
        departure: Joi.string().required(),
        arrival: Joi.string().required()
    })
    return ticket.validate(data)
}

export const updateTicketValidation = (data) =>{
    const ticket = Joi.object({
        customer_id: Joi.string().required(),
        transport_id: Joi.string().optional(),
        from: Joi.string().optional(),
        to: Joi.string().optional(),
        price: Joi.number().optional().min(0),
        departure: Joi.string().optional(),
        arrival: Joi.string().optional()
    })
       return ticket.validate(data)
}