const mean = require('./AlgorithmConstants.json').mean;

const zScoreToScore = (stdError, zScore, noQuestions) => {
    let score = zScore * (stdError * Math.sqrt(noQuestions)) + mean;
    return score < 1 ? 1 : score > 10 ? 10 : score;
};

module.exports = {
    zScoreToScore,
};
