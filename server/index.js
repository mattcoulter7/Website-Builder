const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const path = require('path')

const queryRouter = require('./routers/query');
const userRouter = require('./routers/user');

mongoose.connect('mongodb://localhost/websitebuilder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))
app.use(cookieParser());

app.use('/query', queryRouter);
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, 'src')));

app.listen(3001);