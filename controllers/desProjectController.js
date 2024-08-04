const fs = require('fs');
const path = require('path');
const Desproject = require('../models/Desproject');
const multer = require('multer');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config({ path: '.env.production.local' });
}

const baseUrl = process.env.BASE_URL;

const createProj = async (req, res) => {
  try {
    const file = req.file;
    // Create a new des project with the request body and uploaded image URL
    const newDesproject = new Desproject({
      userId: req.user.id, // Use authenticated user's ID
      name: req.body.name,
      filename: file ? file.filename : undefined,
      desc: req.body.desc,
      url: file ? baseUrl + 'uploads/media/' + file.filename : undefined,
      link: req.body.link,
      status: req.body.status,
      stacks: req.body.stacks,
      type: req.body.type,
    });

    // Save the new des project to the database
    try {
      const savedDesproject = await newDesproject.save();
      res.json(savedDesproject);
    } catch (err) {
      // If there was an error saving the des project, delete the uploaded image
      if (file) {
        fs.unlinkSync(file.path);
      }
      res.status(400).json({ msg: 'Failed to save des project: ' + err });
    }
  } catch (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ msg: 'Image upload error: ' + err.message });
    } else {
      res.status(400).json({ msg: 'Failed to create des project: ' + err });
    }
  }
};

const updateProj = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authenticated request
    const desprojectId = req.params.id; // Desproject ID from the URL

    // Find the des project by ID
    const desproject = await Desproject.findById(desprojectId);

    if (!desproject) {
      return res.status(404).json({ msg: 'Des project not found' });
    }

    // Check if the des project belongs to the authenticated user
    if (desproject.userId.toString() !== userId) {
      return res.status(403).json({ msg: 'Not authorized to update this project' });
    }

    // Update the des project
    const { name, desc, link, github, status, stacks } = req.body;
    const file = req.file;

    desproject.name = name || desproject.name;
    desproject.desc = desc || desproject.desc;
    desproject.link = link || desproject.link;
    desproject.github = github || desproject.github;
    desproject.status = typeof status !== 'undefined' ? status : desproject.status;
    desproject.stacks = stacks || desproject.stacks;

    if (file) {
      // If a new file is uploaded, delete the old file
      if (desproject.filename) {
        const oldFilePath = path.join(__dirname, '..', 'uploads/media', desproject.filename);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      desproject.filename = file.filename;
      desproject.url = baseUrl + 'uploads/media/' + file.filename;
    }

    await desproject.save();

    res.json(desproject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getProj = async (req, res) => {
  try {
    const desProject = await Desproject.findById(req.params.id);

    // Check if the des project exists
    if (!desProject) {
      return res.status(404).json({ msg: 'Des project not found' });
    }

    // Check if the current user is the owner of the des project
    if (desProject.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    res.json(desProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllProj = async (req, res) => {
  try {
    // Get all des projects for the current user
    const desprojects = await Desproject.find({ userId: req.user.id });
    res.json(desprojects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const delProj = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const desprojectId = new mongoose.Types.ObjectId(req.params.id);
    const desproject = await Desproject.findById(desprojectId);

    // Check if the des project exists
    if (!desproject) {
      return res.status(404).json({ msg: 'Des project not found' });
    }

    // Check if the current user is the owner of the des project
    if (desproject.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // Delete the des project from the database
    await Desproject.findByIdAndRemove(req.params.id);

    // Delete the file from the uploads/media folder
    const filePath = path.join(__dirname, '..', 'uploads/media', desproject.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ msg: 'Des project and file deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const delAllProj = async (req, res) => {
  try {
    // Delete all des projects for the current user
    const result = await Desproject.deleteMany({ userId: req.user.id });
    const deletedCount = result.deletedCount;

    // Delete all files from the uploads/media folder
    const dirPath = path.join(__dirname, '..', 'uploads/media');
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      fs.unlinkSync(path.join(dirPath, file));
    }

    res.json({ msg: `${deletedCount} des projects and files deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createProj, updateProj, getAllProj, getProj, delProj, delAllProj };
