const CurrentTest = require('../models').CurrentTest;
const User = require('../models').User;
const TestToken = require('../models').TestToken;
const CATdata = require('../models').CatData;
const TestResult = require('../models').TestResult;
const JWT = require('../Middleware/JWT');

//AUX
const addExamineesToTest = async (userArray, test) => {
    let token = null;
    for (let i = 0; i < userArray.length; i++) {
        token = await JWT.generateAccessToken(userArray[i].email);
        console.log(userArray[i].id);

        if (token) {
            await User.update(
                { current_test_id: test.id },
                {
                    where: {
                        id: userArray[i].id,
                    },
                }
            );

            await TestToken.create({
                userId: userArray[i].id,
                token: token,
            });

            await CATdata.create({
                userId: userArray[i].id,
                candidate_ability: 0,
                probability_sum: 0,
                iif_sum: 0,
                response_sum: 0,
                std_error: 2,
                no_questions: 0,
            });

            await TestResult.create({
                userId: userArray[i].id,
                date: new Date(),
                result: 0,
                nQuestions: 0,
                duration: 0,
                examinerEmail: test.examiner_email,
            });
        } else {
            res.res.status(404).send('Token was not generated');
        }
    }
};

const stopTestUpdateDB = async (userArray, test) => {
    for (user of userArray) {
        try {
            await test.destroy();
            await TestToken.destroy({
                where: {
                    userId: user.id,
                },
            });
        } catch (err) {
            console.log(err.message);
        }
    }
    //TODO: before delete current test, add to test result?
};

//GET
const getTestData = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        const currentTestData = await CurrentTest.findOne({
            where: {
                id: user.current_test_id,
            },
        });
        res.status(200).send(currentTestData);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//POST
const setTestData = async (req, res) => {
    try {
        const reqData = req.body.testData;
        const timeStamp = new Date();
        const currentTest = await CurrentTest.create({
            examiner_email: reqData.examinerEmail,
            min_minutes: reqData.minMinutes,
            min_questions: reqData.minQuestions,
            time_stamp: timeStamp,
        });
        console.log(currentTest);

        addExamineesToTest(reqData.usersForTest, currentTest.dataValues).then(
            () => {
                res.status(200).send(currentTest);
            }
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//DELETE -> stop test logic
const examinerStopTest = async (req, res) => {
    const reqData = req.body.testData;
    const test = await CurrentTest.findOne({
        where: {
            examiner_email: reqData.examinerEmail,
        },
    });
    stopTestUpdateDB(reqData.usersForTest, test)
        .then(res.status(200).send('Updated BD on stop test condition'))
        .catch(err => {
            res.status(400).send('Error in stop test logic');
            console.log(err.message);
        });
};

module.exports = {
    setTestData,
    examinerStopTest,
    getTestData,
};
