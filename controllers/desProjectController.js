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

const baseUrl = process.env.BASE_URL

const createProj = async (req, res) => {
  try {
    const file = req.file;
    // Create a new des project with the request body and uploaded image URL
    const newDesproject = new Desproject({
      id: req.body.id,
      name: req.body.name,
      filename: file.filename,
      desc: req.body.desc,
      url: baseUrl + 'uploads/media/' + file.filename,
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
      fs.unlinkSync(file.path);
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

// Update Route
const updateProj = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const desprojectId = new mongoose.Types.ObjectId(req.params.id);
    const desproject = await Desproject.findById(desprojectId);

    // Find the des project by ID
    if (!desproject) {
      return res.status(404).json({ msg: 'Des project not found' });
    }

    // Update the des project
    const { name, desc, link, status, stacks, type } = req.body;
    desproject.name = name;
    desproject.desc = desc;
    desproject.link = link;
    desproject.status = status;
    desproject.stacks = stacks;
    desproject.type = type;

    await desproject.save();

    res.json(desproject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Route by ID
const getProj = async (req, res) => {
  try {
    const desProject = await Desproject.findById(req.params.id);

    if (!desProject) {
      return res.status(404).json({ msg: 'Des project not found' });
    }

    res.json(desProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Route
const getAllProj = async (req, res) => {
  try {
    const desprojects = await Desproject.find();
    res.json(desprojects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete single project
const delProj = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const desprojectId = new mongoose.Types.ObjectId(req.params.id);
    const desproject = await Desproject.findById(desprojectId);

    // Find the des project by ID
    if (!desproject) {
      return res.status(404).json({ msg: 'Des project not found' });
    }

    // Delete the des project from the database
    await Desproject.findByIdAndRemove(req.params.id);

    // Delete the file from the uploads folder
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

// Delete all projects
const delAllProj = async (req, res) => {
  try {
    const result = await Desproject.deleteMany({});
    const deletedCount = result.deletedCount;

    // Delete all files from the uploads folder
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

module.exports = {createProj, updateProj, getAllProj, getProj, delProj, delAllProj};
