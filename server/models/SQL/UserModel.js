const mysqldb = require('../../utils/mysql-db');

const userSchema = new mysqldb.Schema({
    user: {
        type: "VARCHAR(255)",
        required: true
    },
    hash: { // md5 string
        type: "VARCHAR(255)",
        required: true
    }
})

module.exports = (connection) => new mysqldb.model('User', userSchema,connection)