import express from 'express';
import Service from '../models/Service.js';
import verifyAdmin from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
});

// Get a single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching service details', error: err.message });
  }
});

// Create a service (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const { title, icon, description, detailedDescription, image } = req.body;
  if (!title || !icon || !description || !detailedDescription) {
    return res.status(400).json({ message: 'Title, icon, description, and detailedDescription are required' });
  }

  try {
    const newService = new Service({ title, icon, description, detailedDescription, image });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ message: 'Error creating service', error: err.message });
  }
});

// Update a service (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  const { title, icon, description, detailedDescription, image } = req.body;
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (title) service.title = title;
    if (icon) service.icon = icon;
    if (description) service.description = description;
    if (detailedDescription) service.detailedDescription = detailedDescription;
    if (image !== undefined) service.image = image;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: 'Error updating service', error: err.message });
  }
});

// Delete a service (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service', error: err.message });
  }
});

export default router;
