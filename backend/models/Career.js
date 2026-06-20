import mongoose from 'mongoose';
import { wrapModel } from './modelWrapper.js';

const careerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String },
  resumeLink: { type: String }
}, { timestamps: true });

const MongooseCareer = mongoose.model('Career', careerSchema);
const Career = wrapModel('Career', MongooseCareer);
export default Career;
