const { Sequelize } = require('sequelize');
const CurrentTest = require('../models').CurrentTest;
const User = require('../models').User;
const TestToken = require('../models').TestToken;
const Test = require('../storage/Test/Test');
const TestArray = require('../storage/Test/TestArray');
const TestData = require('../storage/TestData/TestData');
const Examinee = require('../storage/Examinee/Examinee');
const JWT = require('../Middleware/JWT');

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
        } else {
            res.res.status(404).send('Token was not generated');
        }
    }
};

const setTestData = async (req, res) => {
    try {
        const reqData = req.body.testData;

        const currentTest = await CurrentTest.create({
            examiner_email: reqData.examinerEmail,
            min_minutes: reqData.minMinutes,
            min_questions: reqData.minQuestions,
            start_time_stamp: Date.now(),
        });

        addExamineesToTest(reqData.usersForTest, currentTest).then(() => {
            res.status(200).send(currentTest);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    setTestData,
};
