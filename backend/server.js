const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || require('./config/config.json').port;
const model = require('./models');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

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
// app.get('/', (req, res) => {
//     res.send('Server is working');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

//
const public = path.join(__dirname, '../frontend/public');
app.use(cors());
app.use('/api', routes);
app.use('/', express.static(public));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});
