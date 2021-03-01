module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'choice',
        {
            questionId: {
                type: DataTypes.INTEGER,
            },
            choice_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isCorrect: {
                type: DataTypes.BOOLEAN,
                required: true,
                defaultValue: false,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
