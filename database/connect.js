const mongoose = require('mongoose');

// const DB_URL = 'mongodb://127.0.0.1/pindie';
// const DB_URL = "mongodb+srv://pakshaartem:a1082805@cluster0.g7r53.mongodb.net/pindie?retryWrites=true&w=majority&appName=Cluster0";
const DB_URL = process.env.MONGODB_URI


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