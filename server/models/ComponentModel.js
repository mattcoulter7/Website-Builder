const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/types/objectid');

const componentSchema = new mongoose.Schema({
    pageId: {
        type: ObjectId,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    title:{
        type: String
    },
    body:{
        type: String
    }
})

module.exports = mongoose.model('Component', componentSchema)