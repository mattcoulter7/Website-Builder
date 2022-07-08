const mysqldb = require('../../utils/mysql-db');

const componentSchema = new mysqldb.Schema({
    parentId: { // can be a page or another element...
        type: "VARCHAR(255)"
    },
    type: {
        type: "VARCHAR(255)",
        required: true
    },
    value: {
        type: "VARCHAR(255)"
    },
    src: {
        type: "VARCHAR(255)"
    },
    _index: {
        type: "INT",
        default: 0
    },
    presetGroup: {
        type: "VARCHAR(255)",
        default: ""
    }
})

module.exports = (connection) => new mysqldb.model('component', componentSchema,connection) 