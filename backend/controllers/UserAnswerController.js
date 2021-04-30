const Question = require('../models').Question;
const UserAnswer = require('../models').UserAnswer;
const User = require('../models').User;
const computeProbability = require('../algorithm/ComputeProbability')
    .computeProbability;
const computeNewDifficulty = require('../algorithm/QuestionDifficulty')
    .computeNewDifficulty;
const scoreToZScore = require('../algorithm/scoreToZScore').scoreToZScore;
const computeIIF = require('../algorithm/IIF').computeIIF;
const constants = require('../algorithm/AlgorithmConstants.json');
const { Op } = require('sequelize');

const postAnswerProbability = async (req, res) => {
    try {
        const userAnswers = await UserAnswer.findAll({
            where: {
                userId: req.params.id,
            },
        });

        for (let i = 0; i < userAnswers.length; i++) {
            let currentQuestionDifficulty = await Question.findOne({
                attributes: ['estimated_difficulty'],
                where: {
                    id: userAnswers[i].questionId,
                },
            });

            currentQuestionDifficulty = scoreToZScore(
                constants.stdError,
                currentQuestionDifficulty.estimated_difficulty,
                1
            );

            let questionProbability = computeProbability(
                currentQuestionDifficulty,
                req.params.ability
            );

            await UserAnswer.update(
                { probability: questionProbability },
                {
                    where: {
                        questionId: userAnswers[i].questionId,
                    },
                }
            );
        }

        res.status(200).send('ok');
    } catch (err) {
        res.status(404).send(err.message);
        throw new Error(err.message);
    }
};

//TODO: complete update questions diff function
const updateQuestionsDifficulty = async (req, res) => {
    let testNewDifficultyArray = [];
    let questionDataArray = null;
    let newDifficulty = 0;
    let correctAnswersSum = 0;
    let probabilitySum = 0;
    let IIFSum = 0;

    try {
        const answeredQuestions = await Question.findAll({
            attributes: ['id', 'estimated_difficulty'],
            include: [
                {
                    model: User,
                    where: {
                        id: {
                            [Op.not]: null,
                        },
                    },
                    attributes: [],
                },
            ],
        });

        for (let i = 0; i < answeredQuestions.length; i++) {
            questionDataArray = await UserAnswer.findAll({
                attributes: ['isCorrect', 'probability'],
                where: {
                    questionId: answeredQuestions[i].id,
                },
            });
            questionDataArray.forEach(element => {
                correctAnswersSum += element.isCorrect;
                probabilitySum += element.probability;
                IIFSum += computeIIF(element.probability);
            });
            newDifficulty = computeNewDifficulty(
                answeredQuestions[i].estimated_difficulty,
                probabilitySum,
                correctAnswersSum,
                IIFSum
            );
            testNewDifficultyArray.push(newDifficulty);
            //TODO: uncomment if this endpoint will be used
            // await Question.update(
            //     { estimated_difficulty: newDifficulty },
            //     {
            //         where: {
            //             id: answeredQuestions[i].id,
            //         },
            //     }
            // );
            correctAnswersSum = 0;
            probabilitySum = 0;
            IIFSum = 0;
        }

        res.status(200).send(testNewDifficultyArray);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

module.exports = {
    postAnswerProbability,
    updateQuestionsDifficulty,
};
