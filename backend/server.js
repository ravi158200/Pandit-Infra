import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Route Handlers
import authRoutes from './routes/auth.routes.js';
import serviceRoutes from './routes/services.routes.js';
import projectRoutes from './routes/projects.routes.js';
import queryRoutes from './routes/queries.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import careerRoutes from './routes/careers.routes.js';

// Load Config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pandit_infra';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support larger base64 payloads for images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Pandit Infra Backend Server is running smoothly' });
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/careers', careerRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Database Connection & Server Startup
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully to: ' + MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database Connection Failure:', err);
    process.exit(1);
  });
