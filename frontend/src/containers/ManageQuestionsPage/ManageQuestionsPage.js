import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionTable from '../../components/QuestionsTable/QuestionsTable';
import UserService from '../../Services/UserService';
import './ManageQuestionsPage.css';

const URL = require('../../config/url-info.json');

const tableColumns = [
    //FIXME: validate input data
    {
        title: 'Question',
        field: 'question_text',
        editable: 'never',
    },
    {
        title: 'Difficulty',
        field: 'estimated_difficulty',
        type: 'numeric',
    },
    {
        title: 'Suggested difficulty',
        field: 'suggested_difficulty',
        editable: 'never',
    },
];

const choicesColumns = [
    //FIXME: validate input data
    {
        title: 'Choice text',
        field: 'choice_text',
        editable: 'never',
    },
    {
        title: 'Correct',
        field: 'isCorrect',
        editable: 'never',
    },
];

function ManageQuestionsPage() {
    let [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios
            .get(`${URL.API_BASE_URL}/questions/choices`)
            .then(res => {
                setTableData(res.data);
            })
            .catch(err => {
                throw new Error(err.message);
            });
    }, []);

    return (
        <div className="manage-questions-page">
            <div className="questions-table">
                <QuestionTable
                    columns={tableColumns}
                    data={tableData}
                    choicesColums={choicesColumns}
                />
            </div>
        </div>
    );
}

export default ManageQuestionsPage;
