module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user_role',
        {},
        {
            underscored: true,
            timestamps: false,
        }
    );
};
