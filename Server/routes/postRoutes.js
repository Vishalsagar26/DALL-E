import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/modules/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ROUTE to get all the post
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' })
    }
});

//Crete post route
router.route('/').post(async (req, res) => {
    try {
        //sending it from the front end
        const { name, prompt, photo } = req.body;

        //uploading it to the cloud
        const photoUrl = await cloudinary.uploader.upload(photo);

        //creating instance only using the url 
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' })
    }
});

export default router;