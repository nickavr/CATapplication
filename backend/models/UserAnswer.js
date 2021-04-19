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
            answer_text: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
