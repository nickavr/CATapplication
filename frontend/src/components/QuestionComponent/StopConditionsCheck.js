const admitedStdError = 0.3;

const getTestDuration = testStartTime => {
    return Math.floor(
        Math.abs(new Date(testStartTime) - new Date()) / 1000 / 60
    );
};

const stopTest = (stdError, testData, noQuestions) => {
    if (stdError <= admitedStdError) {
        return true;
    } else if (
        getTestDuration(testData.time_stamp) >= testData.min_minutes ||
        noQuestions >= testData.min_questions
    ) {
        return true;
    }
    return false;
};

export default stopTest;
