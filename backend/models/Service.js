import mongoose from 'mongoose';
import { wrapModel } from './modelWrapper.js';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

const MongooseService = mongoose.model('Service', serviceSchema);
const Service = wrapModel('Service', MongooseService);
export default Service;
