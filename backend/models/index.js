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

//users -> tests (1:M)
Test.belongsTo(User, { onDelete: 'cascade' });
User.hasMany(Test, { onDelete: 'cascade' });

//users -> questions (M:M) through user_answear
UserAnswear.belongsTo(User, { onDelete: 'cascade' });
User.hasMany(UserAnswear, { onDelete: 'cascade' });
UserAnswear.belongsTo(Question, { onDelete: 'cascade' });
Question.hasMany(UserAnswear, { onDelete: 'cascade' });

//questions -> choices (1:M)
Question.hasMany(Choice, { onDelete: 'cascade' });
Choice.belongsTo(Question, { onDelete: 'cascade' });

//choice -> userAnswear (1:1) for faster validation of the correct answear
UserAnswear.hasOne(Choice, { onDelete: 'cascade' });
Choice.belongsTo(UserAnswear, { onDelete: 'cascade' });
