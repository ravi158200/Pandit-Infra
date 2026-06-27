import mongoose from 'mongoose';
import { wrapModel } from './modelWrapper.js';

const timelineSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, required: true },
  description: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Ongoing', 'Completed', 'Live'], 
    default: 'Ongoing' 
  },
  progress: { type: Number, default: 0 },
  client: { type: String },
  location: { type: String },
  timeline: [timelineSchema],
  images: [{ type: String }],
  beforeImage: { type: String, default: '' },
  afterImage: { type: String, default: '' }
}, { timestamps: true });

const MongooseProject = mongoose.model('Project', projectSchema);
const Project = wrapModel('Project', MongooseProject);
export default Project;
