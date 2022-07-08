const crypto = require('crypto')

class Schema {
    constructor(fields = {}) {
        /*fields._id = { // guid id
            type:"CHAR(20)",
            required:true,
            default:() => crypto.randomBytes(10).toString("hex")
        }*/
        fields._id = { // auto increment id
            type:"INT",
            required:true,
            autoIncrement: true,
            default:0
        }
        this.fields = fields
    }

    fieldsToSQLString() {
        return `(${Object.entries(this.fields).map(pair => this.fieldToSQLString(pair[0],pair[1])).join(",")})`
    }

    fieldToSQLString(fieldName,config = {}){
        let sqlString = `${fieldName}`
        let secondaryString = ``
        if (config.type) {
            if (typeof config.type === 'string'){
                sqlString += ` ${config.type}`
            }
            else {
                sqlString += ` CHAR(20)`;
                secondaryString += `FOREIGN KEY (${fieldName}) REFERENCES ${config.type.ref}(_id)`
            }
        }
        if (config.required) sqlString += ` NOT NULL`
        if (config.autoIncrement) sqlString += ` AUTO_INCREMENT`
        if (fieldName == "_id"){
            secondaryString += `Primary KEY (${fieldName})`
        }
        return secondaryString ? `${sqlString},
        ${secondaryString}` : sqlString;
    }

    prepare(values = {}){
        // ensures default values and correct columns exist only
        var obj = {};

        Object.entries(this.fields).forEach((pair) => {
            let key = pair[0]
            let config = pair[1]
            obj[key] = (() => {
                if (typeof values[key] !== "undefined") return values[key];
                if (typeof config.default !== "undefined") return typeof config.default === "function" ? config.default() : config.default;
                return null
            })();
        })
        return obj;
    }
}

class model {
    constructor(tableName, schema, connection) {
        this.tableName = tableName
        this.schema = schema
        this.connection = connection

        // try to initialise the table
        this.createTable()
            .then((result) => {
            })
            .catch((e) => {
                console.error(e)
            })
    }
    createTable() {
        return new Promise((success, failure) => {
            let queryString = `CREATE TABLE ${this.tableName} ${this.schema.fieldsToSQLString()}`;
            this.connection.query(queryString, function (error, result) {
                if (error) return failure(error)
                success(result)
            })
        })
    }
    find() {
        return new Promise((success, failure) => {
            let queryString = `SELECT * FROM ${this.tableName}`;
            this.connection.query(queryString, function (error, result) {
                if (error) return failure(error)
                success(result)
            });
        })
    }
    findById(id) {
        return new Promise((success, failure) => {
            let queryString = `SELECT * FROM ${this.tableName} WHERE _id = '${id}'`;
            this.connection.query(queryString, function (error, result) {
                if (error) return failure(error)
                success(result[0])
            });
        })
    }
    findByIdAndDelete(id) {
        return new Promise((success, failure) => {
            let queryString = `DELETE FROM ${this.tableName} WHERE _id = '${id}'`;
            this.connection.query(queryString, function (error, result) {
                if (error) return failure(error)
                success(result)
            });
        })
    }
    updateOne(values={}){
        return new Promise((success, failure) => {
            let id = values._id
            values = this.schema.prepare(values)

            delete values._id; // don't update the id

            let queryString = `UPDATE ${this.tableName} SET ${this.getKeyValueSQLString(values)} WHERE _id = '${id}'`;
            this.connection.query(queryString, function (error, result) {
                if (error) return failure(error)
                success(result)
            });
        })
    }
    insertOne(values={}){
        return new Promise((success, failure) => {
            values = this.schema.prepare(values)
            
            let queryString = `INSERT INTO ${this.tableName} (${this.getKeySQLString(values)}) VALUES (${this.getValueSQLString(values)})`;
            this.connection.query(queryString, function (error, result) {
                if (error) return failure(error)
                success(result)
            });
        })
    }

    getKeySQLString(values = {}){
        return `${Object.keys(values).join(", ")}`
    }
    getValueSQLString(values = {}){
        return `${Object.values(values).map(v => this.valueToSQLString(v)).join(", ")}`
    }
    getKeyValueSQLString(values = {}){
        return `${Object.entries(values).map(pair => this.keyValueToSQLString(pair[0],pair[1])).join(', ')}`
    }
    keyValueToSQLString(key,value){
        return `${key} = ${this.valueToSQLString(value)}`;
    }
    valueToSQLString(value){
        if (value === null) return `NULL`;
        if (typeof value === "string") return `'${value}'`;
        return value;
    }
}

module.exports = {
    Schema: Schema,
    model: model
}