import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Gallery from '../models/Gallery.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pandit_infra';

const servicesData = [
  {
    title: 'Building Construction',
    icon: 'Building2',
    description: 'Residential, commercial, and high-rise structures built to top standards.',
    detailedDescription: 'From architectural concepts to structural execution, we construct modern homes, office blocks, shopping centers, and high-rise apartments. We ensure structural integrity, compliance with safety codes, and execution within standard timeline boundaries.',
    image: '/src/assets/services/building-construction.png'
  },
  {
    title: 'Road Construction',
    icon: 'Construction',
    description: 'Highways, arterial roads, and asphalt surfacing works.',
    detailedDescription: 'Our road division specializes in building robust highway links, urban avenues, and heavy-duty industrial pavements. We utilize premium hot-mix asphalt, concrete surfacing technology, and site preparation machinery to construct durable roadways.',
    image: '/src/assets/services/road-construction.png'
  },
  {
    title: 'Interior Work',
    icon: 'Palette',
    description: 'Premium modern false ceilings, wall panels, and interior designs.',
    detailedDescription: 'Transforming interior environments into sleek and functional spaces. We handle modular partition setups, false ceilings, custom cabinetry, flooring solutions, and finishings for corporate hubs as well as premium residential estates.',
    image: '/src/assets/services/interior-work.png'
  },
  {
    title: 'Plumbing Solutions',
    icon: 'Droplets',
    description: 'Heavy plumbing, drainage planning, and high-pressure supply systems.',
    detailedDescription: 'Comprehensive plumbing layout design and installation for multi-story apartments and industrial parks. Includes water treatment distribution pipes, sewage management layouts, and modern sanitary installations.',
    image: '/src/assets/services/plumbing-solutions.png'
  },

  {
    title: 'RCC Work',
    icon: 'HardHat',
    description: 'Reinforced cement concrete structural foundations and beams.',
    detailedDescription: 'Execution of massive concrete foundation layouts, structural slabs, shear walls, retaining walls, and pillars. We deploy precision-mixed concrete and reinforcement templates to ensure superior load-bearing specifications.',
    image: '/src/assets/services/rcc-work.png'
  },
  {
    title: 'Structural Design',
    icon: 'DraftingCompass',
    description: 'Advanced CAD blueprinting and structural stability analysis.',
    detailedDescription: 'Expert civil engineering planning and blueprint analysis. We offer structural calculations, seismic analysis, foundation modeling, and 3D CAD visualization to design robust structural framing.',
    image: '/src/assets/services/structural-design.png'
  },
  {
    title: 'Renovation Services',
    icon: 'Hammer',
    description: 'Retrofitting, visual remodels, and structural rehabilitation.',
    detailedDescription: 'Rejuvenating older properties, strengthening dilapidated components, and upgrading structures with modern fixtures. Our restoration team breathes new life into corporate workspaces and historical builds.',
    image: '/src/assets/services/renovation-services.png'
  },
  {
    title: 'Industrial Projects',
    icon: 'Factory',
    description: 'Warehouses, plant foundations, and large manufacturing sheds.',
    detailedDescription: 'We specialize in industrial infrastructure including pre-engineered structural steel buildings (PEB), factory storage warehouses, custom heavy machinery foundations, and industrial drainage pipelines.',
    image: '/src/assets/services/industrial-projects.png'
  }
];

const projectsData = [
  {
    title: 'Pandit Commercial Complex',
    description: 'A state-of-the-art 7-story commercial center with modern amenities, automated parking, and eco-friendly features.',
    category: 'Commercial',
    status: 'Completed',
    progress: 100,
    client: 'Apex Business Hubs',
    location: 'Mumbai, MH',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { status: 'Initiated', description: 'Architectural blueprints and permissions approved.', date: new Date('2024-01-10') },
      { status: 'RCC Framed', description: 'Foundation concrete casting and 7 floors structural framework completed.', date: new Date('2024-06-15') },
      { status: 'Completed', description: 'Finishing, interior electrification, and client handover successfully finalized.', date: new Date('2025-03-20') }
    ]
  },
  {
    title: 'State Highway Route 4',
    description: '4-lane highway expansion project spanning 12 kilometers including culvert installations and toll plaza layouts.',
    category: 'Infrastructure',
    status: 'Ongoing',
    progress: 65,
    client: 'National Roads Authority',
    location: 'Pune-Nashik Link',
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { status: 'Ongoing', description: 'Earthwork excavation and layer leveling under progress.', date: new Date('2025-08-01') },
      { status: 'Bridge Slabs', description: 'Bridge culvert girders and RCC decks installed.', date: new Date('2026-02-14') },
      { status: 'Paving', description: 'Commenced asphalt top paving on Section A and B.', date: new Date('2026-05-10') }
    ]
  },
  {
    title: 'Pandit Green Heights Res',
    description: 'Premium residential luxury towers with 2BHK/3BHK smart layouts, landscaped gardens, and a grand clubhouse.',
    category: 'Residential',
    status: 'Live',
    progress: 40,
    client: 'Pandit Housing Realty',
    location: 'Thane West, MH',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { status: 'Excavation', description: 'Deep basement piling and soil stabilization complete.', date: new Date('2025-11-05') },
      { status: 'Foundation Casting', description: 'Main concrete raft foundation successfully poured.', date: new Date('2026-01-20') },
      { status: 'Live Update', description: 'Floor 4 slab steel binding and electrical conduit laying underway.', date: new Date('2026-06-05') }
    ]
  },
  {
    title: 'Giga-Logistics PEB Warehouse',
    description: 'Construction of a 50,000 sq ft pre-engineered steel warehouse (PEB structure) featuring high-load concrete flooring and integrated storm drainage layout.',
    category: 'Industrial',
    status: 'Ongoing',
    progress: 75,
    client: 'Giga Logistics Corp',
    location: 'Nagpur Industrial Zone, MH',
    images: [
      '/src/assets/projects/industrial-project.png'
    ],
    timeline: [
      { status: 'Excavation', description: 'High-tonnage grading, soil compaction, and foundation layout completed.', date: new Date('2025-12-10') },
      { status: 'Foundation', description: 'Raft concrete pouring and anchor bolts alignment finalized.', date: new Date('2026-02-22') },
      { status: 'RCC Framed', description: 'Pre-engineered structural steel columns and rafters erection initiated.', date: new Date('2026-05-18') }
    ]
  },
  {
    title: 'Heritage Villa Restoration',
    description: 'Complete structural rehabilitation, retrofitting, and interior modern remodel of a 50-year-old heritage residential villa.',
    category: 'Renovation',
    status: 'Completed',
    progress: 100,
    client: 'Singhania Estates',
    location: 'South Mumbai, MH',
    images: [
      '/src/assets/projects/renovation-project.png'
    ],
    timeline: [
      { status: 'Initiated', description: 'Structural stability audit and planning approved.', date: new Date('2025-09-05') },
      { status: 'Phase 1', description: 'Retrofitting walls, beams, and columns concrete jacket casting complete.', date: new Date('2025-12-18') },
      { status: 'Completed', description: 'Modern layout styling, MEP systems layout, and interior handover finalized.', date: new Date('2026-04-12') }
    ]
  }
];

const galleryData = [
  { imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80', title: 'Excavator on Site', category: 'Infrastructure' },
  { imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', title: 'Glass Facade Complex', category: 'Commercial' },
  { imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', title: 'Residential Tower Structure', category: 'Residential' },
  { imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', title: 'RCC Steel Mesh Reinforcement', category: 'Infrastructure' },
  { imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', title: 'Penthouse Lounge interior', category: 'Residential' },
  { imageUrl: 'https://images.unsplash.com/photo-1503387762-592dedb82617?auto=format&fit=crop&w=800&q=80', title: 'Architect Blueprint Planning', category: 'Commercial' },
  { imageUrl: '/src/assets/gallery/industrial-gallery.png', title: 'Industrial Warehouse Truss Setup', category: 'Industrial' },
  { imageUrl: '/src/assets/gallery/renovation-gallery.png', title: 'Luxury Villa Living Room Remodel', category: 'Renovation' }
];

async function seed() {
  console.log('Seeding Database Started...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to Database for seeding.');
  } catch (error) {
    console.warn('Mongoose connect failed. Seeding to JSON local files instead!');
    console.warn('Reason:', error.message);
  }

  try {
    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Gallery.deleteMany({});
    console.log('Existing collections cleared.');

    const adminUser = new User({
      username: 'admin',
      email: 'raviraj7301325@gmail.com',
      phone: '9876543210',
      password: '123456'
    });
    await adminUser.save();
    console.log('Default Admin User Seeded.');

    // Create Services
    await Service.insertMany(servicesData);
    console.log('Default Services Seeded.');

    // Create Projects
    await Project.insertMany(projectsData);
    console.log('Sample Projects Seeded.');

    // Create Gallery Items
    await Gallery.insertMany(galleryData);
    console.log('Sample Gallery Media Seeded.');

    console.log('Seeding Complete! Database is populated.');
  } catch (error) {
    console.error('Seeding Error during insertions:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Database disconnected.');
    }
    console.log('Seed process finished.');
  }
}

seed();
