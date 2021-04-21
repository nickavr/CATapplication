const getTestDuration = testStartTime => {
    return Math.floor(
        Math.abs(new Date(testStartTime) - new Date()) / 1000 / 60
    );
};

export default getTestDuration;
