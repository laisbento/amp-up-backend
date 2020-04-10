const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(PROCESS.env.ENV_URL);

module.exports = connection;