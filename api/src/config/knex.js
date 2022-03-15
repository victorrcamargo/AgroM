require('dotenv').config()
const Knex = require('knex');
const knexConfig = require('./knexfile');
const env = process.env.NODE_ENV || 'development';

const knex = Knex(knexConfig[env]);


module.exports = knex;