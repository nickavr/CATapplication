const Question = require('../models').Question;
let Choice = require('../models').Choice;
const sequelize = require('../models').sequelize;

//AUX
function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

//GET
//TODO: refactor function when adding algorithm
const getNextQuestion = async (req, res) => {
    try {
        let noQuestions = await Question.count();
        let questionIdArray = [];

        for (let i = 0; i < noQuestions; i++) {
            questionIdArray.push(i + 1);
        }
        questionIdArray = shuffle(questionIdArray);
        let nextQuestionId = questionIdArray.pop();
        let choicesArray = await Choice.findAll({
            where: { question_id: nextQuestionId },
        });
        let nextRandomQuestion = await Question.findOne({
            where: { id: nextQuestionId },
        });

        let completeQuestin = {
            choices: choicesArray,
            question: nextRandomQuestion,
        };

        res.status(200).json(completeQuestin);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getNextQuestion,
};
