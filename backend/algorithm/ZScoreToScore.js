const mean = require('./AlgorithmConstants.json').mean;

const zScoreToScore = (stdError, zScore, noQuestions) => {
    return zScore * (stdError * Math.sqrt(noQuestions)) + mean;
};

module.exports = {
    zScoreToScore,
};
