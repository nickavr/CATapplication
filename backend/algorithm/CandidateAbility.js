const lowZScore = require('./AlgorithmConstants.json').lowZScore;
const highZScore = require('./AlgorithmConstants.json').highZScore;

const computeNewAbility = (
    currentAbility,
    probabilitySum,
    correctAnswerSum,
    IIFsum
) => {
    let newAbility =
        currentAbility + (correctAnswerSum - probabilitySum) / IIFsum;

    return newAbility < lowZScore
        ? lowZScore
        : newAbility > highZScore
        ? highZScore
        : newAbility;
};

module.exports = {
    computeNewAbility,
};
