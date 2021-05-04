const Question = require('../models').Question;
const UserAnswer = require('../models').UserAnswer;
const Choice = require('../models').Choice;
const User = require('../models').User;
const sequelize = require('../models').sequelize;
const { Op } = require('sequelize');
const zScoreToScore = require('../algorithm/ZScoreToScore').zScoreToScore;

const getAnsweredQuestions = async userId => {
    try {
        const questionsIdArray = await Question.findAll({
            attributes: ['id'],
            include: [
                {
                    model: User,
                    where: { id: userId },
                    attributes: [],
                },
            ],
        });

        questionsIdArray.forEach((element, index, arr) => {
            arr[index] = element.id;
        });
        return questionsIdArray;
    } catch (err) {
        throw new Error(err.message);
    }
};

const addUserAnswer = async (req, res) => {
    try {
        await UserAnswer.create({
            userId: req.body.userId,
            questionId: req.body.questionId,
            isCorrect: req.body.response,
        });

        res.status(200).send('Ok');
    } catch (err) {
        res.status(404).send(err.message);
        throw new Error(err.message);
    }
};

const getNextQuestion = async (req, res) => {
    let candiateAbility = zScoreToScore(
        req.params.stdError,
        req.params.ability,
        req.params.noQuestions
    );

    let answeredQuestionsIdArray = await getAnsweredQuestions(req.params.id);

    try {
        let question = await Question.findOne({
            include: [
                {
                    model: Choice,
                },
            ],
            limit: 1,
            order: [
                [
                    sequelize.fn(
                        'ABS',
                        sequelize.literal(
                            `estimated_difficulty - ${candiateAbility}`
                        )
                    ),
                    'ASC',
                ],
            ],
            where: {
                id: { [Op.notIn]: answeredQuestionsIdArray },
            },
        });

        res.status(200).send(question);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

module.exports = {
    getNextQuestion,
    getAnsweredQuestions,
    addUserAnswer,
};
