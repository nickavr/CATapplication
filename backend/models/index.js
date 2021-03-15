const { Sequelize } = require('./db.js');
let sequelize = require('./db.js');
const path = require('path');
const UserAnswear = require(path.join(__dirname, './UserAnswear.js'))(
    sequelize,
    Sequelize.DataTypes
);
const Question = require(path.join(__dirname, './Question.js'))(
    sequelize,
    Sequelize.DataTypes
);
const Choice = require(path.join(__dirname, './Choice.js'))(
    sequelize,
    Sequelize.DataTypes
);
const User = require(path.join(__dirname, './User.js'))(
    sequelize,
    Sequelize.DataTypes
);
const Test = require(path.join(__dirname, './Test.js'))(
    sequelize,
    Sequelize.DataTypes
);
const Role = require(path.join(__dirname, './Role.js'))(
    sequelize,
    Sequelize.DataTypes
);
const UserRole = require(path.join(__dirname, './UserRole.js'))(
    sequelize,
    Sequelize.DataTypes
);

//users -> tests (1:M)
Test.belongsTo(User, { onDelete: 'cascade' });
User.hasMany(Test, { onDelete: 'cascade' });

//users -> roles (M:M)
User.belongsToMany(Role, { through: 'user_role' });
Role.belongsToMany(User, { through: 'user_role' });

//users -> questions (M:M) through user_answear
User.belongsToMany(Question, { through: 'user_answear' });
Question.belongsToMany(User, { through: 'user_answear' });

//questions -> choices (1:M)
Question.hasMany(Choice, { onDelete: 'cascade' });
Choice.belongsTo(Question, { onDelete: 'cascade' });

//choice -> userAnswear (1:1) for faster validation of the correct answear
UserAnswear.hasOne(Choice, { onDelete: 'cascade' });
Choice.belongsTo(UserAnswear, { onDelete: 'cascade' });

module.exports = {
    sequelize,
    User,
    UserAnswear,
    Question,
    Choice,
    Test,
    Role,
    UserRole,
};
