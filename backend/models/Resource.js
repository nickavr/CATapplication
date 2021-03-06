module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'resource',
        {
            testId: {
                type: DataTypes.INTEGER,
                required: true,
            },
            topicId: {
                type: DataTypes.INTEGER,
                required: true,
            },
            link: {
                type: DataTypes.STRING,
                required: true,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
