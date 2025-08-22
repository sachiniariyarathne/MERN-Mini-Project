const express = require('express');
const app = express();
const cors = require('cors');
const port  = 3001;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://sachini2002:sta20020814@cluster0.fxjcnbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectDB();

const server = app.listen(3001, '127.0.0.1', () => {
    console.log(`Server is running on ${server.address().port}`)
});

app.use('/api', router);

server.listen(port, () => {
    if (server.address()) {
        console.log(`Server is running on ${server.address().port}`);
    } else {
        console.log('Server failed to start.');
    }
});