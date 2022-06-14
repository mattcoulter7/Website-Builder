const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Website', websiteSchema)