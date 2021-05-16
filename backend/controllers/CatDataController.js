const sequelize = require('../models').sequelize;
const TestResult = require('../models').TestResult;
const TestAnalytics = require('../models').TestAnalytics;
const CATdata = require('../models').CatData;
const computeProbability =
    require('../algorithm/ComputeProbability').computeProbability;
const computeIIF = require('../algorithm/IIF').computeIIF;
const scoreToZScore = require('../algorithm/scoreToZScore').scoreToZScore;
const computeNewAbility =
    require('../algorithm/CandidateAbility').computeNewAbility;
const computeSE = require('../algorithm/StandardError').computeSE;

//GET

//POST
const addTestAnalytics = async (questionResponse, currentAbility, userId) => {
    try {
        let testResult = await TestResult.findOne({
            where: {
                userId: userId,
            },
            order: [['date', 'DESC']],
        });

        await TestAnalytics.create({
            testResultId: testResult.id,
            topicId: null,
            currentAbility: currentAbility,
            isCorrect: questionResponse,
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

const setCatData = async (req, res) => {
    let currentData = await CATdata.findOne({
        where: { userId: req.body.userId },
    });

    let noQuestion = req.body.no_questions;

    let questionDiff = scoreToZScore(
        currentData.dataValues.std_error,
        req.body.question_difficulty,
        noQuestion
    );
    let questionResponse = req.body.question_response;
    let candidateCurrentAbility = req.body.candidate_ability;

    let newProbability = computeProbability(
        candidateCurrentAbility,
        questionDiff
    );

    let iif = computeIIF(newProbability);

    try {
        await addTestAnalytics(
            questionResponse,
            candidateCurrentAbility,
            req.body.userId
        );
        await CATdata.update(
            {
                probability_sum: sequelize.literal(
                    `probability_sum + ${newProbability}`
                ),
                iif_sum: sequelize.literal(`iif_sum + ${iif}`),
                response_sum: sequelize.literal(
                    `response_sum + ${questionResponse}`
                ),
                no_questions: noQuestion,
            },
            {
                where: {
                    userId: req.body.userId,
                },
            }
        );

        let updatedCatData = await CATdata.findOne({
            where: { userId: req.body.userId },
        });

        let newEstimatedAbility = computeNewAbility(
            candidateCurrentAbility,
            updatedCatData.probability_sum,
            updatedCatData.response_sum,
            updatedCatData.iif_sum
        );

        let newStdError = computeSE(updatedCatData.iif_sum);

        await CATdata.update(
            {
                candidate_ability: newEstimatedAbility,
                std_error: newStdError,
            },
            {
                where: {
                    userId: req.body.userId,
                },
            }
        );

        res.status(200).send({
            candidateAbility: newEstimatedAbility,
            stdError: newStdError,
        });
    } catch (err) {
        res.status(404).send(err.message);
    }
};

module.exports = {
    setCatData,
};
