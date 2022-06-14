const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/types/objectid');

const componentSchema = new mongoose.Schema({
    pageId: {
        type: ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Component', componentSchema)