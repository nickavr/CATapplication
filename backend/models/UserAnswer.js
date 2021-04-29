module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user_answer',
        {
            userId: {
                type: DataTypes.INTEGER,
            },
            questionId: {
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
