const Question = require('../models').Question;
const UserAnswer = require('../models').UserAnswer;
const QuestionAnalytics = require('../models').QuestionAnalytics;
const User = require('../models').User;
const computeProbability =
    require('../algorithm/ComputeProbability').computeProbability;
const computeNewDifficulty =
    require('../algorithm/QuestionDifficulty').computeNewDifficulty;
const scoreToZScore = require('../algorithm/scoreToZScore').scoreToZScore;
const zScoreToScore = require('../algorithm/ZScoreToScore').zScoreToScore;
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

            await QuestionAnalytics.update(
                { probability: questionProbability },
                {
                    where: {
                        questionId: userAnswers[i].questionId,
                        probability: null,
                        candidateId: req.params.id,
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
            questionDataArray = await QuestionAnalytics.findAll({
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

            let estimatedDifficultyZScore = scoreToZScore(
                constants.stdError,
                answeredQuestions[i].estimated_difficulty,
                1
            );

            newDifficulty = computeNewDifficulty(
                estimatedDifficultyZScore,
                probabilitySum,
                correctAnswersSum,
                IIFSum
            );

            testNewDifficultyArray.push(newDifficulty);
            await Question.update(
                {
                    suggested_difficulty: zScoreToScore(
                        constants.stdError,
                        newDifficulty,
                        1
                    ),
                },
                {
                    where: {
                        id: answeredQuestions[i].id,
                    },
                }
            );
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
