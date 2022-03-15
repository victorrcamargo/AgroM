const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const app = express();

const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const indexRouter = require('./routes/index');

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', indexRouter);

app.use(notFound);
app.use(errorHandler);


module.exports = app;