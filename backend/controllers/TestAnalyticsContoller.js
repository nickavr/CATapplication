const TestAnalytics = require('../models').TestAnalytics;
const TestResults = require('../models').TestResult;
const Topics = require('../models').Topic;
const zScoreToScore = require('../algorithm/ZScoreToScore').zScoreToScore;
const algConstants = require('../algorithm/AlgorithmConstants.json');
//GET
const getAllTopics = async (req, res) => {
    try {
        let topics = await Topics.findAll({ attributes: ['topic_name', 'id'] });
        // topics.forEach((element, i, arr) => {
        //     arr[i] = element.topic_name;
        // });
        res.status(200).send(topics);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getTestAnalyticsForCandidate = async (req, res) => {
    try {
        let testAnalyticsData = await TestAnalytics.findAll({
            include: [
                {
                    model: TestResults,
                    where: {
                        userId: req.body.userId,
                        date: req.body.date,
                    },
                    attributes: [],
                },
            ],
        });

        testAnalyticsData.forEach((element, i, arr) => {
            arr[i].currentAbility = zScoreToScore(
                algConstants.stdError,
                element.currentAbility,
                1
            ).toFixed(2);
        });

        res.status(200).send(testAnalyticsData);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllTopics,
    getTestAnalyticsForCandidate,
};
