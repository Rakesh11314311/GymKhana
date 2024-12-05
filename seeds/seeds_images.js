const multer = require('multer');
const express = require('express');
const Image = require('../models/image');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    const newImage = new Image({
        name: req.file.originalname,
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });

    await newImage.save();
    res.send("Image uploaded successfully");
});
