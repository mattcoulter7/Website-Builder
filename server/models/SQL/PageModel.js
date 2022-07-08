const mysqldb = require('../../utils/mysql-db');

const pageSchema = new mysqldb.Schema({
    name: {
        type: "VARCHAR(255)",
        required: true
    },
    websiteId:{
        type: "CHAR(20)",
        required: true
    }
})

module.exports = (connection) => new mysqldb.model('Page', pageSchema,connection)