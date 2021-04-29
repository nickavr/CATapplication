const computeIIF = currentProbability => {
    return currentProbability * (1 - currentProbability);
};

module.exports = {
    computeIIF,
};
