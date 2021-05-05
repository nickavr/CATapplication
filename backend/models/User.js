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
            email: {
                type: DataTypes.STRING,
                required: true,
                unique: true,
            },
            current_test_id: {
                type: DataTypes.INTEGER,
                required: true,
            },
            finished_test: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};
