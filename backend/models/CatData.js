module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'cat_data',
        {
            userId: {
                type: DataTypes.INTEGER,
                required: true,
            },
            candidate_ability: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            probability_sum: {
                type: DataTypes.FLOAT,
                required: true,
                defaultValue: 0,
            },
            iif_sum: {
                type: DataTypes.FLOAT,
                required: true,
                unique: true,
            },
            response_sum: {
                type: DataTypes.FLOAT,
                required: true,
            },
            std_error: {
                type: DataTypes.FLOAT,
                required: true,
            },
            no_questions: {
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
