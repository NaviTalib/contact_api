import express from 'express';
import mongoose from 'mongoose';
import { register } from './Controllers/user.js';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import {config} from 'dotenv';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

config({path: '.env'});

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'test'
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
  res.json({ message : "This is home route ...."})
});

// user router
app.use('/api/user',userRouter);


// contact router
app.use('/api/contact',contactRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});