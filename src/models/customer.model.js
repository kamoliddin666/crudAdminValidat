import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
customerSchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'customer_id'
});

export default model('Customer', customerSchema);
