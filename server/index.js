
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const queryRouter = require('./routers/query');
const userRouter = require('./routers/user');

const app = express();

const FILE_SIZE_LIMIT = '16mb'

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
app.use('/query', queryRouter);
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, 'src')));
app.listen(process.env.PORT);