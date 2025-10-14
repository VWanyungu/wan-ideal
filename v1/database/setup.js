import knex from 'knex';
import config from '../../knexfile.js';
// const knex = require('knex');
// const config = require('./knexfile');

const env = process.env.NODE_ENV || 'development';
const db = knex(config[env]);

export default db