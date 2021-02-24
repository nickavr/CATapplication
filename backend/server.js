const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || require('./config/config.json').port;
const model = require('./models');

//DB authentification
model.sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
        console.log('Unable to connect to database');
    });

// Standard
model.sequelize.sync();
// If we have modification for the tables
// model.sequelize.sync({ alter: true });

// testing the server
app.get('/', (req, res) => {
    res.send('Server is working');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//
