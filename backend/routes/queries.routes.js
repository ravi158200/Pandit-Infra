import express from 'express';
import Query from '../models/Query.js';
import verifyAdmin from '../middleware/auth.middleware.js';

const router = express.Router();

// Submit a Query / Lead (Public)
router.post('/', async (req, res) => {
  const { name, email, phone, message, serviceType } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Name, email, phone, and message are required' });
  }

  try {
    const newQuery = new Query({ name, email, phone, message, serviceType });
    const savedQuery = await newQuery.save();

    // Mocking email notification
    console.log(`
=========================================
EMAIL NOTIFICATION (MOCKED)
TO: administration@panditinfra.com
SUBJECT: New Contact Inquiry from ${name}
-----------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Service Requested: ${serviceType || 'General Civil Work Query'}
Message: ${message}
=========================================
    `);

    res.status(201).json(savedQuery);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting inquiry', error: err.message });
  }
});

// Get all Queries (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contact queries', error: err.message });
  }
});

// Update Query Status (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Status is required' });

  try {
    const queryItem = await Query.findById(req.params.id);
    if (!queryItem) return res.status(404).json({ message: 'Inquiry not found' });

    queryItem.status = status;
    const updatedQuery = await queryItem.save();
    res.json(updatedQuery);
  } catch (err) {
    res.status(500).json({ message: 'Error updating inquiry status', error: err.message });
  }
});

// Delete Query (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const queryItem = await Query.findByIdAndDelete(req.params.id);
    if (!queryItem) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inquiry', error: err.message });
  }
});

export default router;
