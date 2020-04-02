const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongoConnection = `mongodb+srv://${process.env.TRUMPET_USERNAME}:${process.env.TRUMPET_DB_PASS}@trumpetdb-a4fkr.mongodb.net/${process.env.TRUMPET_DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('DB Connected!')
});