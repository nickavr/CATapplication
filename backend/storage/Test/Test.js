class Test {
    constructor(examinees, testData) {
        this.examinees = examinees;
        this.testData = testData;
    }

    addExaminee(examinee) {
        if (
            examinee.hasOwnProperty('email') &&
            examinee.hasOwnProperty('token')
        ) {
            this.examinees.push(examinee);
        } else {
            throw new Exception('User format is not correct');
        }
    }
}

module.exports = Test;
