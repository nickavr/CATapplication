module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'test_result',
        {
            userId: {
                type: DataTypes.INTEGER,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            result: {
                type: DataTypes.FLOAT,
                required: true,
            },
            noQuestions: {
                type: DataTypes.INTEGER,
                required: true,
            },
            duration: {
                type: DataTypes.INTEGER,
                required: true,
            },
            examinerEmail: {
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
