import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";


const router = express.Router()
const controller = new CustomerController()

router
    .post('/', controller.createCustomer )
    .get('/', controller.getAllCustomer)
    .get('/:id', controller.getCustomerById)
    .patch('/:id', controller.updateCustomer)
    .delete('/:id', controller.deleteCustomer)

export default router;

