const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/types/objectid');

const componentSchema = new mongoose.Schema({
    parentId: { // can be a page or another element...
        type: ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: String
    },
    src: {
        type: String
    },
    index: {
        type: Number,
        default: 0
    },
    isTemplate: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String
    }
})

module.exports = mongoose.model('Component', componentSchema) 