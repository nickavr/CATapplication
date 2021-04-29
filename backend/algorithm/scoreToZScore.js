const mean = require('./AlgorithmConstants.json').mean;

const scoreToZScore = (stdError, score, noQuestions) => {
    return (score - mean) / (Math.sqrt(noQuestions) * stdError);
};

module.exports = {
    scoreToZScore,
};
