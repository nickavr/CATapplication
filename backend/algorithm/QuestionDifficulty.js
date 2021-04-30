const lowZScore = require('./AlgorithmConstants.json').lowZScore;
const highZScore = require('./AlgorithmConstants.json').highZScore;

const computeNewDifficulty = (
    currentDifficulty,
    probabilitySum,
    correctAnswerSum,
    IIFsum
) => {
    let newDifficulty =
        currentDifficulty + (-correctAnswerSum + probabilitySum) / IIFsum;

    return newDifficulty < lowZScore
        ? lowZScore
        : newDifficulty > highZScore
        ? highZScore
        : newDifficulty;
};

module.exports = {
    computeNewDifficulty,
};
