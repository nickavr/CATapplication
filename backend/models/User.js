module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            estimated_ability: {
                type: DataTypes.FLOAT,
                required: true,
                defaultValue: 0,
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                required: true,
                defaultValue: false,
            },
            email: {
                type: DataTypes.STRING,
                required: true,
                unique: true,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
