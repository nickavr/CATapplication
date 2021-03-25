const TestModel = require('../models').Test;
const Test = require('../storage/Test/Test');
const TestArray = require('../storage/Test/TestArray');
const TestData = require('../storage/TestData/TestData');
const Examinee = require('../storage/Examinee/Examinee');
const JWT = require('../Middleware/JWT');
//FIXME: only after the second post req, test has examinee added for some reason
const addExamineesToTest = async (user, test) => {
    const token = await JWT.generateAccessToken(user.email);
    test.addExaminee(new Examinee(user.email, token));
};

const setTestData = async (req, res) => {
    try {
        const reqData = req.body.testData;

        let testData = new TestData(reqData.minMinutes, reqData.minQuestions);
        let test = new Test(new Array(), testData);
        reqData.usersForTest.forEach(user => addExamineesToTest(user, test));

        TestArray.testArray.push(test);
        // console.log(TestArray.testArray);

        res.status(200).send(TestArray.testArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    setTestData,
};
