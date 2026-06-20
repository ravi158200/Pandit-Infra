import express from 'express';
import Career from '../models/Career.js';
import verifyAdmin from '../middleware/auth.middleware.js';

const router = express.Router();

// Submit job application (Public)
router.post('/', async (req, res) => {
  const { name, email, phone, position, message, resumeLink } = req.body;
  if (!name || !email || !phone || !position) {
    return res.status(400).json({ message: 'Name, email, phone, and position are required' });
  }

  try {
    const newApplication = new Career({ name, email, phone, position, message, resumeLink });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting job application', error: err.message });
  }
});

// View all job applications (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications', error: err.message });
  }
});

// Delete application record (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const app = await Career.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting application record', error: err.message });
  }
});

export default router;
