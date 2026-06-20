import mongoose from 'mongoose';
import { wrapModel } from './modelWrapper.js';

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String },
  category: { type: String, default: 'General' }
}, { timestamps: true });

const MongooseGallery = mongoose.model('Gallery', gallerySchema);
const Gallery = wrapModel('Gallery', MongooseGallery);
export default Gallery;
