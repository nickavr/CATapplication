const Test = require('../models').Test;
const TestData = require('../storage/TestData');

const getTestData = (req, res) => {
    try {
        TestData.dataArray.push({
            ...req.body.testData,
        });

        res.status(200).send('Successful');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getTestData,
};
