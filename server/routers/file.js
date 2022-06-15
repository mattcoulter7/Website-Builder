require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const upload = require("../middleware/upload");
const Grid = require("gridfs-stream");
const router = express.Router();

let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        if (!file) return res.status(400).send(`File ${req.params.filename} does not exist`);
        
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send(true);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file present in the request");
    }
    const imgUrl = `http://localhost:${process.env.PORT}/file/${req.file.filename}`;
    return res.status(200).send(imgUrl);
});

module.exports = router;