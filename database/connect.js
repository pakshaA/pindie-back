const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1/pindie';

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database successfully');
    } catch (err) {
        console.log('Error connecting to database');
        console.log(err);
    }
}

module.exports = connectToDatabase;