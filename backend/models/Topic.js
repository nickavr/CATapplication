module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'topic',
        {
            topic_name: {
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
