require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || require('./config/config.json').port;
const model = require('./models');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
// If you have modification for the tables, this will drop and rebuild the tables, pay attention
// model.sequelize.sync({ alter: true });
// model.sequelize.sync({ force: true });

const public = path.join(__dirname, '../frontend/public');
app.use(cors());
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.header('Origin'));
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     res.header(
//         'Access-Control-Allow-Methods',
//         'GET, POST, OPTIONS, PUT, DELETE'
//     );
//     next();
// });
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/', express.static(public));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});
