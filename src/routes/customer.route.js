import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";


const router = express.Router()
const controller = new CustomerController()

router
    .post('/sign-up', controller.signUp)
    .post('/sign-in', controller.signIn)
    .post('/confirm-signin', controller.confirmSignIn)


export default router;

