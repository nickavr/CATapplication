const TestModel = require('../models').Test;
const Test = require('../storage/Test/Test');
const TestArray = require('../storage/Test/TestArray');
const TestData = require('../storage/TestData/TestData');
const Examinee = require('../storage/Examinee/Examinee');
const JWT = require('../Middleware/JWT');

const addExamineesToTest = async (userArray, test) => {
    let token = null;
    for (let i = 0; i < userArray.length; i++) {
        console.log(userArray[i]);
        token = await JWT.generateAccessToken(userArray[i].email);
        test.addExaminee(new Examinee(userArray[i].email, token));
    }
};

const setTestData = (req, res) => {
    try {
        const reqData = req.body.testData;

        let testData = new TestData(reqData.minMinutes, reqData.minQuestions);
        const test = new Test(new Array(), testData);
        console.log(reqData.usersForTest);

        addExamineesToTest(reqData.usersForTest, test).then(() => {
            TestArray.testArray.push(test);
            res.status(200).send(TestArray.testArray);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    setTestData,
};
