const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { singleUpload } = require('../middleware/multerConn');
const Devproject = require('../models/Devproject');
const multer = require('multer');

const baseUrl = 'http://localhost:8080/';

// url: 'http://localhost:8080/uploads/' + file.filename,

// create main Model
router.post('/', singleUpload('file'), async (req, res) => {
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
});

// Update Route
router.put('/devprojects/:id', async (req, res) => {
  try {
    const updatedProject = await Devproject.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ msg: 'Devproject not found' });
    }

    return res.json(updatedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Get Route by ID
router.get('/:id', async (req, res) => {
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
});

// Get All Route
router.get('/', async (req, res) => {
  try {
    const devprojects = await Devproject.find();
    res.json(devprojects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete single project
router.delete('/:id', async (req, res) => {
  try {
    const devproject = await Devproject.findById(req.params.id);

    // Find the dev project by ID

    if (!devproject.toString()) {
      return res.status(404).json({ msg: 'Dev project not found' });
    }

    // Delete the dev project from the database
    await Devproject.findByIdAndRemove(req.params.id);

    // Delete the file from the uploads folder
    const filePath = path.join(__dirname, '..', 'uploads', devproject.filename);
    fs.unlinkSync(filePath);

    res.json({ msg: 'Dev project and file deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete all projects
router.delete('/', async (req, res) => {
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
});

module.exports = router;
