const fs = require('fs');
const path = require('path');
const Devproject = require('../models/Devproject');
const multer = require('multer');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config({ path: '.env.production.local' });
}

const baseUrl = process.env.BASE_URL

const createProj = async (req, res) => {
  try {
    const file = req.file;

    // Create a new dev project with the request body and uploaded image URL
    const newDevproject = new Devproject({
      userId: req.user.id, // Use authenticated user's ID
      name: req.body.name,
      filename: file ? file.filename : undefined,
      desc: req.body.desc,
      url: file ? baseUrl + 'uploads/media/' + file.filename : undefined,
      link: req.body.link,
      github: req.body.github,
      status: req.body.status,
      type: req.body.type,
      stacks: req.body.stacks,
    });

    // Save the new dev project to the database
    try {
      const savedDevproject = await newDevproject.save();
      res.json(savedDevproject);
    } catch (err) {
      // If there was an error saving the dev project, delete the uploaded image
      if (file) {
        fs.unlinkSync(file.path);
      }
      res.status(400).json({ msg: 'Failed to save dev project: ' + err });
    }
  } catch (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ msg: 'Image upload error: ' + err.message });
    } else {
      res.status(400).json({ msg: 'Failed to create dev project: ' + err });
    }
  }
};

const updateProj = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authenticated request
    const devprojectId = req.params.id; // Devproject ID from the URL

    // Find the dev project by ID
    const devproject = await Devproject.findById(devprojectId);

    if (!devproject) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }

    // Check if the dev project belongs to the authenticated user
    if (devproject.userId.toString() !== userId) {
      return res.status(403).json({ msg: 'Not authorized to update this project' });
    }

    // Update the dev project
    const { name, desc, link, github, status, stacks } = req.body;
    const file = req.file;

    devproject.name = name || devproject.name;
    devproject.desc = desc || devproject.desc;
    devproject.link = link || devproject.link;
    devproject.github = github || devproject.github;
    devproject.status = typeof status !== 'undefined' ? status : devproject.status;
    devproject.stacks = stacks || devproject.stacks;

    if (file) {
      // If a new file is uploaded, delete the old file
      if (devproject.filename) {
        const oldFilePath = path.join(__dirname, '..', 'uploads/media', devproject.filename);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      devproject.filename = file.filename;
      devproject.url = baseUrl + 'uploads/media/' + file.filename;
    }

    await devproject.save();

    res.json(devproject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


const getProj = async (req, res) => {
  try {
    const devProject = await Devproject.findById(req.params.id);

    // Check if the dev project exists
    if (!devProject) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }

    // Check if the current user is the owner of the dev project
    if (devProject.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    res.json(devProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllProj = async (req, res) => {
  try {
    // Get all dev projects for the current user
    const devprojects = await Devproject.find({ userId: req.user.id });
    res.json(devprojects);
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

    const devprojectId = new mongoose.Types.ObjectId(req.params.id);
    const devproject = await Devproject.findById(devprojectId);

    // Check if the dev project exists
    if (!devproject) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }

    // Check if the current user is the owner of the dev project
    if (devproject.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // Delete the dev project from the database
    await Devproject.findByIdAndRemove(req.params.id);

    // Delete the file from the uploads/media folder
    const filePath = path.join(__dirname, '..', 'uploads/media', devproject.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ msg: 'Dev project and file deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const delAllProj = async (req, res) => {
  try {
    // Delete all dev projects for the current user
    const result = await Devproject.deleteMany({ userId: req.user.id });
    const deletedCount = result.deletedCount;

    // Delete all files from the uploads/media folder
    const dirPath = path.join(__dirname, '..', 'uploads/media');
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      fs.unlinkSync(path.join(dirPath, file));
    }

    res.json({ msg: `${deletedCount} dev projects and files deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createProj, updateProj, getAllProj, getProj, delProj, delAllProj };