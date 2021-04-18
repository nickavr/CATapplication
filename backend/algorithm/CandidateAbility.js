const lowZScore = -2.25;
const highZScore = 2.25;

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
