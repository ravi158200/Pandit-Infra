/**
 * seedServices.js
 * Run once to populate MongoDB with 6 default Pandit Infra services
 * using the local static image assets from /images/services/
 *
 * Usage:
 *   cd backend
 *   node scripts/seedServices.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Service from '../models/Service.js';

const DEFAULT_SERVICES = [
  {
    title: 'Building Construction',
    icon: 'Building2',
    image: '/images/services/building-construction.png',
    description:
      'End-to-end residential and commercial building construction with structural integrity at every phase — from foundation raft to finishing.',
    detailedDescription:
      'Our building construction services encompass complete turnkey delivery — including excavation, PCC/RCC foundation work, framing, column casting, slab pouring, brick masonry, plastering, and finishing. We use M20–M30 grade concrete and Fe 500 TMT steel as per IS code requirements. Our teams handle multi-storey buildings for residential housing societies, commercial plazas, and institutional campuses.'
  },
  {
    title: 'Road & Pavement Works',
    icon: 'Truck',
    image: '/images/services/road-pavement.png',
    description:
      'Heavy-duty asphalt and concrete road construction and maintenance, including sub-base preparation, compaction, and drainage systems.',
    detailedDescription:
      'We specialize in WBM, WMM, and DBM layers for highway and internal road construction. Our services include sub-grade preparation, granular sub-base compaction, bituminous macadam layers, and asphaltic concrete wearing course. We also undertake kerb and drain construction, road marking, and periodic maintenance contracts for industrial zones and township roads.'
  },
  {
    title: 'PEB Steel Structures',
    icon: 'Factory',
    image: '/images/services/peb-steel-shed.png',
    description:
      'Design, supply, and erection of Pre-Engineered Buildings (PEB) for industrial warehouses, logistics hubs, and large-span sheds.',
    detailedDescription:
      'Our PEB division handles end-to-end design coordination, supply of fabricated steel portal frames, purlins, girts, roofing and cladding installation, and civil foundation work. Structures comply with IS 800:2007 code and are designed for large clear spans. We have completed warehouses, automobile ancillary sheds, and cold storage structures.'
  },
  {
    title: 'Interior Fit-Out Works',
    icon: 'Layers',
    image: '/images/services/interior-fit-out.png',
    description:
      'Premium corporate and commercial interior renovation — false ceilings, partition walls, premium flooring, and MEP integration.',
    detailedDescription:
      'We execute high-specification interior fit-out projects for corporate offices, banks, and retail showrooms. Scope includes metal stud partition systems, gypsum false ceilings, access flooring, premium tile and wooden flooring, glass partitions, MEP rough-in and finishing, and complete joinery. Our team coordinates with MEP consultants for seamless integration.'
  },
  {
    title: 'Waterproofing Solutions',
    icon: 'Droplets',
    image: '/images/services/waterproofing.png',
    description:
      'Chemical and membrane waterproofing treatments for rooftops, basements, bathrooms, and water retention structures.',
    detailedDescription:
      'We provide comprehensive waterproofing using crystalline, cementitious, and polymer-modified systems from approved manufacturers. Applications include terrace and rooftop waterproofing (APP/SBS membranes), basement tanking, water tank lining, bathroom wet area treatment, and expansion joint sealing. All applications come with material and workmanship guarantees.'
  },
  {
    title: 'RCC Structural Works',
    icon: 'HardHat',
    image: '/images/services/rcc-structural.png',
    description:
      'Precision reinforced cement concrete work — columns, beams, slabs, retaining walls, and industrial flooring to IS standards.',
    detailedDescription:
      'Our RCC expertise covers design coordination, bar bending schedule preparation, formwork fabrication and erection, rebar placement to approved BBS, and concrete batching, pouring, and curing supervision. We handle industrial equipment foundations, overhead water tanks, underground sumps, compound walls, and precast components. Concrete testing (slump, cube strength) is conducted at every stage.'
  }
];

async function seed() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.');

    // Count existing services to avoid re-seeding
    const existing = await Service.find();
    const existingArray = Array.isArray(existing) ? existing : await existing;

    if (existingArray.length > 0) {
      console.log(`⚠️  ${existingArray.length} services already exist. Skipping seed to avoid duplicates.`);
      console.log('   Delete all services from the admin panel first if you want to re-seed.');
      process.exit(0);
    }

    console.log('🌱 Seeding 6 default services...');
    for (const serviceData of DEFAULT_SERVICES) {
      const service = new Service(serviceData);
      await service.save();
      console.log(`   ✔ Created: ${serviceData.title}`);
    }

    console.log('\n🎉 Seed complete! 6 services added to the database.');
    console.log('   These services use local images from /images/services/\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
