import mongoose from 'mongoose';
import { wrapModel } from './modelWrapper.js';

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  serviceType: { type: String, default: 'General Inquiry' },
  status: { 
    type: String, 
    enum: ['New', 'In Review', 'Contacted', 'Replied', 'Resolved', 'Archived'], 
    default: 'New' 
  },
  adminNotes: { type: String, default: '' },
  replyMessage: { type: String, default: '' }
}, { timestamps: true });

const MongooseQuery = mongoose.model('Query', querySchema);
const Query = wrapModel('Query', MongooseQuery);
export default Query;
