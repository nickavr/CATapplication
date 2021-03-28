module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'test',
        {
            userId: {
                type: DataTypes.INTEGER,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time_stamp: {
                type: 'TIMESTAMP',
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
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
