const Topic = require('../models/Topic').Topic;

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll();
        res.status(200).send(topics);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllTopics,
};
