const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/types/objectid');

const componentSchema = new mongoose.Schema({
    parentId: { // can be a page or another element...
        type: ObjectId
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
    presetGroup: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Component', componentSchema) 