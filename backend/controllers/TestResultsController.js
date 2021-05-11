const TestResult = require('../models').TestResult;

//GET
const getAllDatesForExaminer = async (req, res) => {
    try {
        let datesArray = await TestResult.findAll({
            attributes: ['date', 'id'],
            where: {
                examinerEmail: req.params.email,
            },
        });

        // datesArray.forEach((element, index, arr) => {
        //     arr[index] = element.date;
        // });

        res.status(200).send(datesArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//POST
const getResultsData = async (req, res) => {
    try {
        const testResultsArray = await TestResult.findAll({
            attributes: ['result', 'duration'],
            where: {
                examinerEmail: req.body.email,
                date: req.body.date,
            },
        });

        res.status(200).send(testResultsArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllDatesForExaminer,
    getResultsData,
};
