import express from 'express';
import Gallery from '../models/Gallery.js';
import verifyAdmin from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all gallery items (Public)
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving gallery items', error: err.message });
  }
});

// Add a gallery item (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const { imageUrl, title, category } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const newItem = new Gallery({ imageUrl, title, category: category || 'General' });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding gallery item', error: err.message });
  }
});

// Delete a gallery item (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting gallery item', error: err.message });
  }
});

export default router;
