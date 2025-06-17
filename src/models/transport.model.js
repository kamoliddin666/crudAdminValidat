
import { Schema, model } from "mongoose";

const TransportSchema = new Schema({
    transport_type: {type: String,  enum: ['bus', 'train', 'plane'], required: true},
    class: {type: String,enum: ['economy', 'business', 'premium'], required: true},
    seat: {type: String, required: true}
},{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
TransportSchema.virtual('ticket',{
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'transport_id'
})

const Transport = model('Transport', TransportSchema)
export default Transport