import Customer from '../models/customer.model.js';
import { handleError } from '../helpers/error-handle.js';
import { successRes } from '../helpers/success.response.js';
import {createCustomerValidation,updateCustomerValidation} from '../validation/customer.validation.js'
import {isValidObjectId} from 'mongoose';
import Ticket from '../models/ticket.model.js'

export class CustomerController{
    async createCustomer(req,res){
        try{
            const {value, error} = createCustomerValidation(req.body);
            if(error){
                return handleError(res, error, 422)
            }
            const customer = await Customer.create(value)
            return successRes(res, customer, 201)
        }catch(error){
            return handleError(res, error)
        }
    }

    async getAllCustomer(req,res){
        try{
            const customer = await Customer.find()
            return successRes(res,customer)
        }catch(error){
            return handleError(res, error)
        }
    }

    async getCustomerById(req, res) {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return handleError(res, 'Invalid customer ID', 400);
    }
    const customer = await Customer.findById(id);
    if (!customer) {
      return handleError(res, 'Customer not found', 404);
    }
    const tickets = await Ticket.find({ customer_id: id }).populate("transport_id");
    return successRes(res, {
      customer,
      tickets
    });
  } catch (error) {
    return handleError(res, error);
  }
}


    async updateCustomer(req,res){
        const id = req.params.id
        const customer = await CustomerController.findCustomerById(res, id)
        const {value,error} = updateCustomerValidation(req.body)
        if(error){
            return handleError(res, error, 422)
        } 
        const updateCustomer = await Customer.findByIdAndUpdate(id, value, {new: true})
        return successRes(res, updateCustomer)
    }

    async deleteCustomer(req,res){
        try{
            const id = req.params.id;
            await CustomerController.findCustomerById(res,id)
            await Customer.findByIdAndDelete(id)
            return handleError(res, {message: 'Customer deleted Succesfuly'})
        }catch(error){
            return handleError(res, error)
        }
        
    }

    static async findCustomerById(res, id){
        try{
            if(!isValidObjectId(id)){
                return handleError(res, 'Invalid  customer ID',  400)
            }
            const customer = await Customer.findById(id)
            if(!customer){
                return handleError(res, 'Customer not found', 404)
            }
            return customer
        }catch(error){
            return handleError(res, error)
        }
    }


}

