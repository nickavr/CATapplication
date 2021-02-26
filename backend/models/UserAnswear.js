module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user_answear',
        {
            userId: {
                type: DataTypes.INTEGER,
            },
            questionId: {
                type: DataTypes.INTEGER,
            },
            choiceId: {
                type: DataTypes.INTEGER,
            },
            isCorrect: {
                type: DataTypes.BOOLEAN,
            },
            answear_text: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
