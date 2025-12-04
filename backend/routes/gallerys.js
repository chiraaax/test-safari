const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery'); // Line 6: Only this require needed

console.log('Gallery routes loaded successfully'); // Debug: Confirms file loads

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/gallery - Fetching items'); // Debug
    const galleryItems = await Gallery.find().sort({ createdAt: -1 }); // Sort newest first
    res.json(galleryItems);
  } catch (err) {
    console.error('GET gallery error:', err); // Debug
    res.status(500).json({ message: err.message });
  }
});

// GET single gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('GET /api/gallery/:id - ID:', req.params.id); // Debug
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(item);
  } catch (err) {
    console.error('GET single gallery error:', err); // Debug
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new gallery item (handles FormData with image file)
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/gallery - Body:', req.body, 'File:', req.file ? req.file.filename : 'none'); // Debug
    const { title, type, description } = req.body;
    
    // Explicit validation before creating
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required and cannot be empty' });
    }
    if (!type || type.trim().length === 0) {
      return res.status(400).json({ message: 'Type is required and cannot be empty' });
    }
    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: 'Description is required and cannot be empty' });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store relative path

    const galleryItem = new Gallery({
      title: title.trim(),
      type: type.trim(),
      image,
      description: description.trim(),
    });

    const newItem = await galleryItem.save();
    console.log('Gallery item created - ID:', newItem._id); // Debug
    res.status(201).json(newItem);
  } catch (err) {
    console.error('POST gallery error:', err); // Debug
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a gallery item (handles FormData with optional new image)
router.put('/:id', async (req, res) => {
  try {
    console.log('PUT /api/gallery/:id - ID:', req.params.id, 'Body:', req.body); // Debug
    const { title, type, description } = req.body;

    // Explicit validation for updates (only if provided)
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
    }
    if (type !== undefined) {
      if (!type || type.trim().length === 0) {
        return res.status(400).json({ message: 'Type cannot be empty' });
      }
    }
    if (description !== undefined) {
      if (!description || description.trim().length === 0) {
        return res.status(400).json({ message: 'Description cannot be empty' });
      }
    }

    const updates = {
      ...(title !== undefined && { title: title.trim() }),
      ...(type !== undefined && { type: type.trim() }),
      ...(description !== undefined && { description: description.trim() }),
    };

    // Handle image update if new file uploaded
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
      console.log('Updated with new image:', req.file.filename); // Debug
    }

    const updatedItem = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updatedItem) return res.status(404).json({ message: 'Gallery item not found' });
    console.log('Gallery item updated - ID:', updatedItem._id); // Debug
    res.json(updatedItem);
  } catch (err) {
    console.error('PUT gallery error:', err); // Debug
    res.status(400).json({ message: err.message });
  }
});

// DELETE a gallery item
router.delete('/:id', async (req, res) => {
  try {
    console.log('DELETE /api/gallery/:id - ID:', req.params.id); // Debug
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Gallery item not found' });
    console.log('Gallery item deleted - ID:', deletedItem._id); // Debug
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    console.error('DELETE gallery error:', err); // Debug
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;