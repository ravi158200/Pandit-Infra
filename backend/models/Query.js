import mongoose from 'mongoose';
import { wrapModel } from './modelWrapper.js';

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  serviceType: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Read', 'Replied'], 
    default: 'New' 
  }
}, { timestamps: true });

const MongooseQuery = mongoose.model('Query', querySchema);
const Query = wrapModel('Query', MongooseQuery);
export default Query;
