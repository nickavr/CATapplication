const Question = require('../models').Question;
let Choice = require('../models').Choice;
const sequelize = require('../models').sequelize;
const zScoreToScore = require('../algorithm/ZScoreToScore').zScoreToScore;

//TODO: make such as an user cannot gen the same question twice
const getNextQuestion = async (req, res) => {
    let candiateAbility = zScoreToScore(
        req.params.stdError,
        req.params.ability,
        req.params.noQuestions
    );
    try {
        let questions = await Question.findOne({
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
        });

        res.status(200).send(questions);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

module.exports = {
    getNextQuestion,
};
