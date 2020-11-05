const mongoose = require('mongoose');
const { databaseURI } = require('../config.json');

mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if(err) return console.error(err);
    else return console.log('Successfully connected to MongoDB!');
});

module.exports = mongoose;