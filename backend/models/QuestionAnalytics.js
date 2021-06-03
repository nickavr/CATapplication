module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'questions_analytics',
        {
            questionId: {
                type: DataTypes.INTEGER,
            },
            candidateId: {
                type: DataTypes.INTEGER,
            },
            isCorrect: {
                type: DataTypes.BOOLEAN,
            },
            probability: {
                type: DataTypes.FLOAT,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
