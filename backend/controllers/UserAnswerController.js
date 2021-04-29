const Question = require('../models').Question;
const UserAnswer = require('../models').UserAnswer;
const User = require('../models').User;
const computeProbability = require('../algorithm/ComputeProbability')
    .computeProbability;
const scoreToZScore = require('../algorithm/scoreToZScore').scoreToZScore;
const constants = require('../algorithm/AlgorithmConstants.json');

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

module.exports = {
    postAnswerProbability,
};
