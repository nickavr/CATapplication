import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import UserService from '../../Services/UserService';

const URL = require('../../config/url-info.json');

function SelectTestComponent(props) {
    let [testsDatesArray, setTestsDatesArray] = useState([
        {
            id: 1,
            date: '10/10/2020',
        },
    ]);

    useEffect(() => {
        axios
            .get(
                `${URL.API_BASE_URL}/results/dates/${
                    UserService.getUserFromStorage().email
                }`
            )
            .then(res => {
                setTestsDatesArray(res.data);
            })
            .catch(err => {
                throw new Error(err.mesage);
            });
    }, []);

    return (
        <div>
            <h3>Choose a test to be displayed:</h3>
            <Multiselect
                singleSelect={true}
                options={testsDatesArray}
                displayValue="date"
                closeIcon="close"
                placeholder=""
                onSelect={props.onSelect}
                // onRemove={onUserRemove}
                style={{
                    chips: {
                        background: 'var(--accent-color)',
                    },
                    searchBox: {
                        background: '#fff',
                        border: 'none',
                        boxShadow:
                            '0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                    },
                }}
            />
        </div>
    );
}

export default SelectTestComponent;
