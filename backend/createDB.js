let config = require('./config/config.json');
const mysql = require('mysql2/promise');

let conn;

mysql
    .createConnection({
        user: config.db_user,
        password: config.db_pass,
    })
    .then(connection => {
        conn = connection;
        return connection.query('CREATE DATABASE IF NOT EXISTS tw_exam');
    })
    .then(() => {
        return conn.end();
    })
    .catch(err => {
        console.warn(err.stack);
    });
