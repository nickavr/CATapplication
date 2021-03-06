module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'question',
        {
            topicId: {
                type: DataTypes.INTEGER,
            },
            question_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            estimated_difficulty: {
                type: DataTypes.FLOAT,
                required: true,
                defaultValue: 0,
            },
            suggested_difficulty: {
                type: DataTypes.FLOAT,
            },
            image: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
