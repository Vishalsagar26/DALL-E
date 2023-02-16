import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'


//this will allow us to use environment variables from dotenv file
dotenv.config();

//initialise the app to express 
const app = express();

//to add an additional middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//api end points that can connect to frontside
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//to create route i.e root route
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

//to create an server port or start the server
const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has satarted on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }


}

startServer();