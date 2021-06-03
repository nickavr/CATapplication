const Question = require('../models').Question;
const UserAnswer = require('../models').UserAnswer;
const QuestionAnalytics = require('../models').QuestionAnalytics;
const TestAnalytics = require('../models').TestAnalytics;
const TestResult = require('../models').TestResult;
const Choice = require('../models').Choice;
const Topics = require('../models').Topic;
const User = require('../models').User;
const sequelize = require('../models').sequelize;
const { Op } = require('sequelize');
const zScoreToScore = require('../algorithm/ZScoreToScore').zScoreToScore;

//AUX
const getTopicsIdArray = async () => {
    try {
        let topicsIdArray = await Topics.findAll({
            attributes: ['id'],
        });

        topicsIdArray.forEach((element, i, array) => {
            array[i] = element.id;
        });
        return topicsIdArray;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getTopicByName = async topicName => {
    try {
        let topic = await Topics.findOne({
            where: {
                topic_name: topicName,
            },
        });
        return topic;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateTestAnalytics = async (topicId, userId) => {
    try {
        await TestAnalytics.update(
            {
                topicId: topicId,
            },
            {
                where: {
                    topicId: { [Op.is]: null },
                },
                include: [
                    {
                        model: TestResult,
                        where: {
                            userId: userId,
                        },
                        attributes: [],
                    },
                ],
            }
        );
    } catch (err) {
        throw new Error(err.message);
    }
};

const getNextTopicId = (currNoQuestions, topicsIdArray) => {
    return topicsIdArray[currNoQuestions % topicsIdArray.length];
};

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

//GET
//TODO: for table in manage questions, refactor
const getAllQuestionsAndAnswers = async (req, res) => {
    try {
        let questionsArray = await Question.findAll({
            include: [
                {
                    model: Choice,
                },
            ],
        });

        const formatedQuestionsData = [];

        // testResultsArray.forEach(element => {
        //     formatedQuestionsData.push({
        //         result: element.result,
        //         duration: element.duration,
        //         firstName: element.user.first_name,
        //         lastName: element.user.last_name,
        //         email: element.user.email,
        //     });
        // });

        res.status(200).send(questionsArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addUserAnswer = async (req, res) => {
    try {
        await UserAnswer.create({
            userId: req.body.userId,
            questionId: req.body.questionId,
            // isCorrect: req.body.response,
        });

        await QuestionAnalytics.create({
            questionId: req.body.questionId,
            isCorrect: req.body.response,
            candidateId: req.body.userId,
        });

        res.status(200).send('Ok');
    } catch (err) {
        res.status(404).send(err.message);
        throw new Error(err.message);
    }
};

const getQuestionFromBd = async (
    answeredQuestionsIdArray,
    nextTopicId,
    candidateAbility
) => {
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
                        `estimated_difficulty - ${candidateAbility}`
                    )
                ),
                'ASC',
            ],
        ],
        where: {
            id: { [Op.notIn]: answeredQuestionsIdArray },
            topicId: nextTopicId,
        },
    });
    return question;
};

const getNextQuestion = async (req, res) => {
    try {
        let topicsIdArray = await getTopicsIdArray();
        let candidateAbility = zScoreToScore(
            req.params.stdError,
            req.params.ability,
            req.params.noQuestions
        );
        let answeredQuestionsIdArray = await getAnsweredQuestions(
            req.params.id
        );
        let nextTopicId = getNextTopicId(
            req.params.noQuestions + 1,
            topicsIdArray
        );
        await updateTestAnalytics(nextTopicId, req.params.id);

        let question = null;

        while (question == null) {
            question = await getQuestionFromBd(
                answeredQuestionsIdArray,
                nextTopicId,
                candidateAbility
            );
            if (question == null) {
                nextTopicId++;
            }
        }

        res.status(200).send(question);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//PUT

const updateQuestion = async (req, res) => {
    try {
        await Question.update(
            { estimated_difficulty: req.body.updatedDifficulty },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//delete

const deleteQuestion = async (req, res) => {
    try {
        await Question.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send();
    } catch (err) {
        res.status(500).senda(err.message);
    }
};

//POST
const addNewQuestion = async (req, res) => {
    try {
        topic = await getTopicByName(req.body.question.questionData.topicName);

        if (!topic) {
            topic = await Topics.create({
                topic_name: req.body.question.questionData.topicName,
            });
        }

        let question = await Question.create(
            {
                topicId: topic.id,
                question_text: req.body.question.questionData.questionText,
                estimated_difficulty: req.body.question.questionData.difficulty,
                suggested_difficulty: 0,
                choices: req.body.question.choicesData,
            },
            { include: [Choice] }
        );
        res.status(200).send(question);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getNextQuestion,
    getAnsweredQuestions,
    addUserAnswer,
    getAllQuestionsAndAnswers,
    updateQuestion,
    deleteQuestion,
    addNewQuestion,
};
