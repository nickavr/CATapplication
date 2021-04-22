import getTestDuration from './GetDuration';
const admitedStdError = 0.3;

const stopTest = (stdError, testData, noQuestions) => {
    if (stdError <= admitedStdError) {
        return true;
    } else if (
        getTestDuration(testData.time_stamp) >= testData.max_minutes ||
        noQuestions >= testData.max_questions
    ) {
        return true;
    }
    return false;
};

export default stopTest;
