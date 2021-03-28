module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'role',
        {
            role_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
