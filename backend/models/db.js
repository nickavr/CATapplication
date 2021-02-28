const { Sequelize } = require('sequelize');
let config = require('../config/config.json');

const mysql = require('mysql2/promise');

let conn;

mysql
    .createConnection({
        user: config.db_user,
        password: config.db_pass,
    })
    .then(connection => {
        conn = connection;
        return connection.query(
            'CREATE DATABASE IF NOT EXISTS cat_application'
        );
    })
    .then(() => {
        return conn.end();
    })
    .catch(err => {
        console.warn(err.stack);
    });

const sequelize = new Sequelize(
    'cat_application',
    config.db_user,
    config.db_pass,
    {
        host: config.host,
        dialect: 'mysql',
    }
);

module.exports = sequelize;
