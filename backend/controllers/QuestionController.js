const Question = require('../models').Question;

const getNextQuestion = async (req, res) => {
    try {
        res.status(200).send('Question ok');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getNextQuestion,
};
