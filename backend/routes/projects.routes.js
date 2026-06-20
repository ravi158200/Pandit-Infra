import express from 'express';
import Project from '../models/Project.js';
import verifyAdmin from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});

// Get a single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project details', error: err.message });
  }
});

// Create a project (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const { title, description, category, status, progress, client, location, images, timeline } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Title, description, and category are required' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      category,
      status: status || 'Ongoing',
      progress: progress || 0,
      client,
      location,
      images: images || [],
      timeline: timeline || [{ status: status || 'Ongoing', description: 'Project initiated.' }]
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
});

// Update a project (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  const { title, description, category, status, progress, client, location, images, timeline } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (status) project.status = status;
    if (progress !== undefined) project.progress = progress;
    if (client !== undefined) project.client = client;
    if (location !== undefined) project.location = location;
    if (images) project.images = images;
    if (timeline) project.timeline = timeline;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
});

// Delete a project (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
});

export default router;
