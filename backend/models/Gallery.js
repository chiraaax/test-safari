const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], minlength: [1, 'Title must have at least 1 character'] },
  type: { type: String, required: [true, 'Type is required'], minlength: [1, 'Type must have at least 1 character'] },
  image: { type: String },
  description: { type: String, required: [true, 'Description is required'], minlength: [1, 'Description must have at least 1 character'] },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);