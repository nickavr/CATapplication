import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectTestComponent from '../../components/SelectTestComponent/SelectTestComponent';
import CandidatesReultsTable from '../../components/CandidatesResultsTable/CandidatesResultsTable';
import UserService from '../../Services/UserService';
import './TestResults.css';

const URL = require('../../config/url-info.json');

const tableColumns = [
    {
        title: 'First name',
        field: 'firstName',
    },
    {
        title: 'Last name',
        field: 'lastName',
    },
    {
        title: 'Email',
        field: 'email',
    },
    {
        title: 'Result',
        field: 'result',
    },
    {
        title: 'Duration',
        field: 'duration',
    },
];

function TestResults() {
    let [tableData, setTableData] = useState([]);

    let onDateSelect = (selectedList, selectedItem) => {
        axios
            .post(`${URL.API_BASE_URL}/results`, {
                email: `${UserService.getUserFromStorage().email}`,
                date: `${selectedItem.date}`,
            })
            .then(res => {
                console.log(res.data);
                setTableData(res.data);
            })
            .catch(err => {
                throw new Error(err.mesage);
            });
    };

    return (
        <div className="test-results-page">
            <div className="test-results-contents">
                <SelectTestComponent onSelect={onDateSelect} />
                <CandidatesReultsTable
                    columns={tableColumns}
                    data={tableData}
                />
            </div>
        </div>
    );
}

export default TestResults;
