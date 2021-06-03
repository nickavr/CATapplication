const CurrentTest = require('../models').CurrentTest;
const QuestionAnalytics = require('../models').QuestionAnalytics;
const User = require('../models').User;
const UserAnswer = require('../models').UserAnswer;
const TestToken = require('../models').TestToken;
const CATdata = require('../models').CatData;
const TestResult = require('../models').TestResult;
const JWT = require('../Middleware/JWT');
const zScoreToScore = require('../algorithm/ZScoreToScore').zScoreToScore;

//AUX
const getDuration = timeStamp => {
    return Math.floor(Math.abs(new Date(timeStamp) - new Date()) / 1000 / 60);
};

const getTestDataByUserId = async userId => {
    try {
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });

        const currentTestData = await CurrentTest.findOne({
            where: {
                id: user.current_test_id,
            },
        });

        return currentTestData;
    } catch (err) {
        throw new Error(err.message);
    }
};

const addExamineesToTest = async (userArray, test) => {
    let token = null;
    for (let i = 0; i < userArray.length; i++) {
        token = await JWT.generateAccessToken(userArray[i].email);
        console.log(userArray[i].id);

        if (token) {
            await User.update(
                { current_test_id: test.id, finished_test: false },
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
                noQuestions: 0,
                duration: 0,
                examinerEmail: test.examiner_email,
            });
        } else {
            res.status(404).send('Token was not generated');
        }
    }
};

const deleteGenericTestData = async id => {
    try {
        await TestToken.destroy({
            where: {
                userId: id,
            },
        });

        await CATdata.destroy({
            where: {
                userId: id,
            },
        });
        await UserAnswer.destroy({
            where: {
                userId: id,
            },
        });
    } catch (err) {
        console.log(err.message);
    }
};

const examinerStopTestUpdateDB = async (userArray, test) => {
    await TestResult.destroy({
        where: {
            result: 0,
        },
    });
    await QuestionAnalytics.destroy({
        where: {
            probability: null,
        },
    });
    await test.destroy();
    for (user of userArray) {
        await deleteGenericTestData(user.id);
    }
};

//GET
const getTestData = async (req, res) => {
    try {
        const currentTestData = await getTestDataByUserId(req.params.id);
        res.status(200).send(currentTestData);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const checkCurrentTestData = async (req, res) => {
    try {
        const currentTest = await CurrentTest.findOne({
            where: { examiner_email: req.params.email },
        });

        res.status(200).send(currentTest ? true : false);
    } catch (err) {
        res.status(404).send(err.message);
        throw new Error(err.message);
    }
};

//POST
const setTestData = async (req, res) => {
    try {
        const reqData = req.body.testData;
        const timeStamp = new Date();
        const currentTest = await CurrentTest.create({
            examiner_email: reqData.examinerEmail,
            max_minutes: reqData.maxMinutes,
            max_questions: reqData.maxQuestions,
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

    examinerStopTestUpdateDB(reqData.usersForTest, test)
        .then(res.status(200).send('Updated BD on stop test condition'))
        .catch(err => {
            res.status(400).send('Error in stop test logic');
            console.log(err.message);
        });
};

const examineeFinishesTest = async (req, res) => {
    try {
        const currentTest = await getTestDataByUserId(req.params.id);
        const normalScore = zScoreToScore(
            req.body.stdError,
            req.body.result,
            req.body.noQuestions
        );
        await TestResult.update(
            {
                result: normalScore,
                noQuestions: req.body.noQuestions,
                duration: getDuration(currentTest.time_stamp),
            },
            {
                where: {
                    userId: req.params.id,
                    result: 0,
                },
            }
        );
        await User.update(
            {
                finished_test: true,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        let userIsTakingTest = await User.findOne({
            where: {
                current_test_id: 13,
                finished_test: false,
            },
        });

        if (userIsTakingTest === null) {
            await currentTest.destroy();
        }

        await deleteGenericTestData(req.params.id);

        res.status(200).send({ normalScore });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//TODO: delete route here and in index
const testRoute = async (req, res) => {
    try {
        const currentTest = await getTestDataByUserId(5);
        let userIsTakingTest = await User.findOne({
            where: {
                current_test_id: 133,
                finished_test: false,
            },
        });

        if (userIsTakingTest === null) {
            await currentTest.destroy();
            // res.status(200).send('current test destroyed');
        }
        res.status(200).send(currentTest);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

module.exports = {
    setTestData,
    examinerStopTest,
    examineeFinishesTest,
    getTestData,
    checkCurrentTestData,
    testRoute,
};
