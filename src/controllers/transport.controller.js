import Transport from '../models/transport.model.js'
import {handleError} from '../helpers/error-handle.js'
import { successRes } from '../helpers/success.response.js'
import { createTransportValidator,updateTransportValidator } from '../validation/transport.validation.js'
import { isValidObjectId } from 'mongoose'
import Ticket from '../models/ticket.model.js'

export class TransportController{
    async createTransport(req,res){
        try{
            const {value, error} = createTransportValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const transport = await Transport.create(value)
            return successRes(res, transport, 201)
        }catch(error){
            return handleError(res,error)
        }
    }

    async getAllTransports(req,res){
        try{
            const transports = await Transport.find().populate('ticket')
            return successRes(res, transports)
        }catch(error){
            handleError(res,error)
        }
    }

    async getTransportById(req,res){
        try{
            const id=req.params.id
            const transport = await Transport.findById(id).populate('ticket');
            return successRes(res, transport)
        }catch(error){
            return handleError(res,error)
        }
    }

    async updateTransport(req,res){
        try{
            const id = req.params.id;
            const transport = await TransportController.findTransportById(res,id)
            const {value, error} = updateTransportValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const updateTransport = await Transport.findByIdAndUpdate(id,value,{new: true})
            return successRes(res, updateTransport)
        }catch(error){
            handleError(res, error)
        }
    }

    async deleteTransport(req,res){
        try{
            const id = req.params.id;
            await TransportController.findTransportById(res,id)
            await Transport.findByIdAndDelete(id)
            await Ticket.deleteMany({transport_id: id})
            return successRes(res,{ message: 'Transport deleted succesfuly'})
        }catch(error){
            return handleError(res, error)
        }
    }

    static async findTransportById(res,id){
        try{
            if(!isValidObjectId(id)){
                return handleError(res, 'Invalid objected ID', 400)
            }
            const transport = await Transport.findById(id);
            if(!transport){
                return handleError(res, 'Transport not found', 404)
            }
            return transport
        }catch(error){
            return handleError(res,error)    
        }
    }

}