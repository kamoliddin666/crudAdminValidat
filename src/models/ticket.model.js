
import { Schema, Types, model } from "mongoose";

const TicketSchema = new Schema({
    transport_id: {type: Types.ObjectId, ref: 'Transport', required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    price: {type: Number, required: true},
    departure: {type:String, required: true},
    arrival: {type:String, required: true},
    customer_id: { type: Types.ObjectId, ref: 'Customer', required: true}
}, {timestamps:true});

const Ticket = model('Ticket', TicketSchema)
export default Ticket;




