/**
 * updateServiceImages.js
 * One-time script: Updates existing services in MongoDB to use
 * the new local static images from /images/services/
 *
 * Matches services by title keywords and assigns appropriate images.
 *
 * Usage:
 *   cd backend
 *   node scripts/updateServiceImages.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Service from '../models/Service.js';

// Keyword-to-image mapping
const IMAGE_MAP = [
  { keywords: ['road', 'pavement', 'highway', 'bituminous', 'asphalt', 'wbm', 'wmm'], image: '/images/services/road-pavement.png' },
  { keywords: ['peb', 'steel', 'shed', 'warehouse', 'industrial', 'factory', 'pre-engineered'], image: '/images/services/peb-steel-shed.png' },
  { keywords: ['interior', 'fit-out', 'fitout', 'renovation', 'office', 'ceiling', 'flooring', 'partition'], image: '/images/services/interior-fit-out.png' },
  { keywords: ['waterproof', 'membrane', 'terrace', 'sealant', 'leakage', 'treatment'], image: '/images/services/waterproofing.png' },
  { keywords: ['rcc', 'reinforced', 'concrete', 'column', 'beam', 'slab', 'foundation', 'plumbing', 'structural'], image: '/images/services/rcc-structural.png' },
  { keywords: ['building', 'construct', 'civil', 'structural framing'], image: '/images/services/building-construction.png' },
];

function pickImage(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keywords.some(kw => text.includes(kw))) {
      return entry.image;
    }
  }
  return '/images/services/building-construction.png'; // fallback
}

async function updateImages() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.\n');

    const services = await Service.find().sort({ createdAt: -1 });
    const servicesArray = Array.isArray(services) ? services : await services;

    console.log(`Found ${servicesArray.length} services. Updating images...\n`);

    for (const s of servicesArray) {
      const newImage = pickImage(s.title, s.description || '');
      const updated = await Service.findByIdAndUpdate(s._id, { image: newImage });
      console.log(`  ✔ [${s.title}] → ${newImage}`);
    }

    console.log('\n🎉 All service images updated to local static paths!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Update failed:', err.message);
    process.exit(1);
  }
}

updateImages();
