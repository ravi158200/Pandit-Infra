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
    const newQuery = new Query({ 
      name, 
      email, 
      phone, 
      message, 
      serviceType: serviceType || 'General Inquiry' 
    });
    const savedQuery = await newQuery.save();

    console.log(`
=========================================
EMAIL NOTIFICATION (MOCKED)
TO: panditinfra503@gmail.com
SUBJECT: New Inquiry from ${name}
-----------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Service Requested: ${serviceType || 'General Civil Inquiry'}
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

// Update Query Details & Status (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  const { status, adminNotes, replyMessage, name, email, phone, message, serviceType } = req.body;

  try {
    const queryItem = await Query.findById(req.params.id);
    if (!queryItem) return res.status(404).json({ message: 'Inquiry not found' });

    if (status !== undefined) queryItem.status = status;
    if (adminNotes !== undefined) queryItem.adminNotes = adminNotes;
    if (replyMessage !== undefined) queryItem.replyMessage = replyMessage;
    if (name !== undefined) queryItem.name = name;
    if (email !== undefined) queryItem.email = email;
    if (phone !== undefined) queryItem.phone = phone;
    if (message !== undefined) queryItem.message = message;
    if (serviceType !== undefined) queryItem.serviceType = serviceType;

    const updatedQuery = await queryItem.save();
    res.json(updatedQuery);
  } catch (err) {
    res.status(500).json({ message: 'Error updating inquiry', error: err.message });
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
