import {Schema, model} from "mongoose"

const passportInfoSchema = new Schema({
    serial: {type: String, required: true},
    jshshir: {type: String, required: true},
    full_name: {type: String, required: true},
    customer_id: {type: Types.ObjectId, ref: 'Customer', required: true},
},{timestamps:true});

export default model('PassportInfo', passportInfoSchema)