const express = require('express');
const router = express.Router();

const Authentication = require('../utils/Authentication')
const authenticationEnabled = false;

//#region load all schemas here
var tables = {}
const init = (connection) => {
    tables = {
        'page': require('../models/sql/PageModel')(connection),
        'component': require('../models/sql/ComponentModel')(connection),
        'website': require('../models/sql/WebsiteModel')(connection)
    }
}

//#endregion

router.get('/:table', validateAuthenticated(), validateTable(), async(req, res) => {
    const resultSet = await req.schema.find();
    return res.send(resultSet);
});

router.get('/:table/:id', validateAuthenticated(), validateTable(), async(req, res) => {
    try {
        const resultSet = await req.schema.findById(req.params.id);
        if (resultSet) {
            return res.send(resultSet);
        } else {
            return res.status(404).send({});
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/:table', validateAuthenticated(), validateTable(), async(req, res, next) => {
    try {
        let insertResult = await req.schema.insertOne(req.body);
        let insertId = insertResult.insertId;
        let obj = await req.schema.findById(insertId);
        return res.send(obj);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:table/:id', validateAuthenticated(), validateTable(), async(req, res, next) => {
    try {
        req.body._id = req.params.id
        let result = await req.schema.updateOne(req.body);
        let obj = await req.schema.findById(req.params.id);
        return res.send(obj);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:table/:id', validateAuthenticated(), validateTable(), async(req, res) => {
    try {
        var result = await req.schema.findByIdAndDelete(req.params.id);
        return res.send(!!result.affectedRows);
    } catch (e) {
        return res.status(400).send(e);
    }
});

function validateAuthenticated() {
    // ensures client making request is logged in
    return async(req, res, next) => {
        // get AuthToken from Cookies
        const authToken = req.cookies['AuthToken'];
        req.user = Authentication.Instance().getAuthenticated(authToken);

        if (authenticationEnabled && !req.user) {
            return res.status(401).send("The request cannot be fulfilled as the client has not logged in.");
        }
        return next();
    }
}

function validateTable() {
    // ensures the requested table is valid, sotre is in request
    return async(req, res, next) => {
        req.schema = tables[req.params.table];
        if (!req.schema) {
            return res.status(400).send(new Error(`Table: ${req.params.table} does not exist.`));
        }
        return next()
    }
}

module.exports = {
    router:router,
    init:init
};