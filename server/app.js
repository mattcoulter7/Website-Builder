
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const mysql = require('mysql')
//const queryRouter = require('./routers/mongodb-query');
const queryRouter = require('./routers/mysql-query')
const userRouter = require('./routers/user');


const app = express();

const FILE_SIZE_LIMIT = '16mb'

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


/*var con = mysql.createConnection({
    host: "krans.iad1-mysql-e2-1a.dreamhost.com",
    user: "sample_user1",
    password: "password"
});*/
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "websitebuilder"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    queryRouter.init(con)
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json({limit: FILE_SIZE_LIMIT}));
app.use(bodyParser.urlencoded({
    limit: FILE_SIZE_LIMIT,
    extended: true
}));
app.use(methodOverride('_method'))
app.use(cookieParser());

const fileRouter = require('./routers/file');

app.use('/file', fileRouter);
//app.use('/query', queryRouter);
app.use('/query', queryRouter.router);
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, 'src')));
app.listen(process.env.PORT);