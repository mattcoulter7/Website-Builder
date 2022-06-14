const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/types/objectid');

const pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    websiteId:{
        type: ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Page', pageSchema)