const TestResult = require('../models').TestResult;
const User = require('../models').User;

//GET
const getAllDatesForExaminer = async (req, res) => {
    try {
        let datesArray = await TestResult.findAll({
            attributes: ['date', 'id'],
            where: {
                examinerEmail: req.params.email,
            },
        });

        res.status(200).send(datesArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllDatesForCandidates = async (req, res) => {
    try {
        let datesArray = await TestResult.findAll({
            attributes: ['date', 'id'],
            where: {
                userId: req.params.id,
            },
        });
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
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name', 'email'],
                },
            ],
            where: {
                examinerEmail: req.body.email,
                date: req.body.date,
            },
        });

        const formatedTestResults = [];

        testResultsArray.forEach(element => {
            formatedTestResults.push({
                result: element.result,
                duration: element.duration,
                firstName: element.user.first_name,
                lastName: element.user.last_name,
                email: element.user.email,
            });
        });

        res.status(200).send(formatedTestResults);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllDatesForExaminer,
    getAllDatesForCandidates,
    getResultsData,
};
