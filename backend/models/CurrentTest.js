module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'current_test',
        {
            examiner_email: {
                type: DataTypes.STRING,
                required: true,
            },
            time_stamp: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            min_minutes: {
                type: DataTypes.INTEGER,
                required: true,
            },
            min_questions: {
                type: DataTypes.INTEGER,
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
