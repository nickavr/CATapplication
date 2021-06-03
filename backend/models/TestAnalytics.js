module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'test_analytics',
        {
            testResultId: {
                type: DataTypes.INTEGER,
            },
            topicId: {
                type: DataTypes.INTEGER,
            },
            currentAbility: {
                type: DataTypes.FLOAT,
            },
            isCorrect: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
