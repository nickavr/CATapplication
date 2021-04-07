module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'test_token',
        {
            userId: {
                type: DataTypes.INTEGER,
                required: true,
            },
            token: {
                type: DataTypes.STRING,
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
