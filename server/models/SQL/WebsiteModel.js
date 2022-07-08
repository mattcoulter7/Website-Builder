const mysqldb = require('../../utils/mysql-db');

const websiteSchema = new mysqldb.Schema({
    companyName: {
        type: "VARCHAR(255)",
        required: true
    }
})

module.exports = (connection) => new mysqldb.model('website', websiteSchema,connection)