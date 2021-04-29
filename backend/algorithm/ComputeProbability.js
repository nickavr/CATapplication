const computeProbability = (candidateAbility, questionDifficulty) => {
    const expression = Math.exp(candidateAbility - questionDifficulty);
    return expression / (1 + expression);
};

module.exports = {
    computeProbability,
};
