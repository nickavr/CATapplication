const { Sequelize } = require('./db.js');
let sequelize = require('./db.js');
const path = require('path');
const UserAnswer = require(path.join(__dirname, './UserAnswer.js'))(
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
const TestResult = require(path.join(__dirname, './TestResult.js'))(
    sequelize,
    Sequelize.DataTypes
);
const Resource = require(path.join(__dirname, './Resource.js'))(
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
const Topic = require(path.join(__dirname, './Topic.js'))(
    sequelize,
    Sequelize.DataTypes
);
const TestToken = require(path.join(__dirname, './TestToken.js'))(
    sequelize,
    Sequelize.DataTypes
);
const CurrentTest = require(path.join(__dirname, './CurrentTest.js'))(
    sequelize,
    Sequelize.DataTypes
);
const CatData = require(path.join(__dirname, './CatData.js'))(
    sequelize,
    Sequelize.DataTypes
);
const QuestionAnalytics = require(path.join(__dirname, './QuestionAnalytics'))(
    sequelize,
    Sequelize.DataTypes
);
const TestAnalytics = require(path.join(__dirname, './TestAnalytics'))(
    sequelize,
    Sequelize.DataTypes
);

//users -> tests (1:M)
User.hasMany(TestResult, { onDelete: 'cascade' });
TestResult.belongsTo(User, { onDelete: 'cascade' });

//testResults -> testAnalytics (1:M)
TestResult.hasMany(TestAnalytics, { onDelete: 'cascade' });
TestAnalytics.belongsTo(TestResult, { onDelete: 'cascade' });

//users -> roles (M:M)
User.belongsToMany(Role, { through: 'user_role' });
Role.belongsToMany(User, { through: 'user_role' });

//users -> testTokens (1:1)
User.hasOne(TestToken, { onDelete: 'cascade' });
TestToken.belongsTo(User, { onDelete: 'cascade' });

//users -> questions (M:M) through user_answear
User.belongsToMany(Question, { through: 'user_answer' });
Question.belongsToMany(User, { through: 'user_answer' });

//users -> catData (1:1) for algorithm persistance
User.hasOne(CatData, { onDelete: 'cascade' });
CatData.belongsTo(User, { onDelete: 'cascade' });

//currentTest -> users (1:M)
CurrentTest.hasMany(User);
User.belongsTo(CurrentTest, { onDelete: 'cascade' });

//topics -> resources (1:M)
Topic.hasMany(Resource, { onDelete: 'cascade' });
Resource.belongsTo(Topic, { onDelete: 'cascade' });

//topics -> testAnalytics (1:M)
Topic.hasMany(TestAnalytics, { onDelete: 'cascade' });
TestAnalytics.belongsTo(Topic, { onDelete: 'cascade' });

//topics -> questions (1:M)
Topic.hasMany(Question, { onDelete: 'cascade' });
Question.belongsTo(Topic, { onDelete: 'cascade' });

//questions -> choices (1:M)
Question.hasMany(Choice, { onDelete: 'cascade' });
Choice.belongsTo(Question, { onDelete: 'cascade' });

//questions -> question_analytics (1:M)
Question.hasMany(QuestionAnalytics, { onDelete: 'cascade' });
QuestionAnalytics.belongsTo(Question, { onDelete: 'cascade' });

module.exports = {
    sequelize,
    User,
    TestToken,
    CatData,
    CurrentTest,
    UserAnswer,
    Question,
    QuestionAnalytics,
    Choice,
    TestResult,
    Resource,
    Role,
    UserRole,
    Topic,
    TestAnalytics,
};
