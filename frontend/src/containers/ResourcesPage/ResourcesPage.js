import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourcesTable from '../../components/ResourcesTable/ResourcesTable';
import './ResourcesPage.css';
const URL = require('../../config/url-info.json');

const topicsColumns = [
    {
        title: 'Topic',
        field: 'topic',
        editable: 'never',
    },
];

const linksColumns = [
    {
        title: 'Title',
        field: 'title',
        editable: 'never',
    },
    {
        title: 'Link',
        field: 'link',
        editable: 'never',
    },
];

function ResourcesPage() {
    let [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios
            .get(`${URL.API_BASE_URL}/topics`)
            .then(res => {
                axios
                    .post(`${URL.API_BASE_URL}/resources`, {
                        topics: res.data,
                    })
                    .then(res => {
                        setTableData(res.data);
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            })
            .catch(err => console.log(err.message));
    }, []);

    if (tableData === null) {
        return <>Still loading...</>;
    }

    return (
        <div className="resources-page">
            <div className="resources-table">
                <ResourcesTable
                    columns={topicsColumns}
                    data={tableData}
                    linksColumns={linksColumns}
                />
            </div>
        </div>
    );
}

export default ResourcesPage;
