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
      id: req.body.id,
      name: req.body.name,
      filename: file.filename,
      desc: req.body.desc,
      url: baseUrl + 'uploads/' + file.filename,
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
      fs.unlinkSync(file.path);
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

// Update Route
const updateProj = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }
    
    const devprojectId = new mongoose.Types.ObjectId(req.params.id);
    const devproject = await Devproject.findById(devprojectId);
    
    // Find the dev project by ID
    if (!devproject) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }
    
    // Update the dev project
    const { name, desc, link, github, status, stacks} = req.body;
    devproject.name = name;
    devproject.desc = desc;
    devproject.link = link;
    devproject.github = github;
    devproject.status = status;
    devproject.stacks = stacks;
   
   
    await devproject.save();

    res.json(devproject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Route by ID
const getProj = async (req, res) => {
  try {
    const devProject = await Devproject.findById(req.params.id);

    if (!devProject) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }

    res.json(devProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Route
const getAllProj = async (req, res) => {
  try {
    const devprojects = await Devproject.find();
    res.json(devprojects);
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

    const devprojectId = new mongoose.Types.ObjectId(req.params.id);
    const devproject = await Devproject.findById(devprojectId);

    // Find the dev project by ID
    if (!devproject) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }

    // Delete the dev project from the database
    await Devproject.findByIdAndRemove(req.params.id);

    // Delete the file from the uploads folder
    const filePath = path.join(__dirname, '..', 'uploads', devproject.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ msg: 'Dev project and file deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete all projects
const delAllProj = async (req, res) => {
  try {
    const result = await Devproject.deleteMany({});
    const deletedCount = result.deletedCount;

    // Delete all files from the uploads folder
    const dirPath = path.join(__dirname, '..', 'uploads');
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

module.exports = {createProj, updateProj, getAllProj, getProj, delProj, delAllProj};
