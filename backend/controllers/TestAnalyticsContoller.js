const TestAnalytics = require('../models').TestAnalytics;
const TestResults = require('../models').TestResult;
const Topics = require('../models').Topic;

//GET
const getAllTopics = async (req, res) => {
    try {
        let topics = await Topics.findAll({ attributes: ['topic_name'] });
        topics.forEach((element, i, arr) => {
            arr[i] = element.topic_name;
        });
        res.status(200).send(topics);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
module.exports = {
    getAllTopics,
};
