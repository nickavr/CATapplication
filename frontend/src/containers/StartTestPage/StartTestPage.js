import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import './StartTestPage.css';

const URL = require('../../config/url-info.json');
//TODO: handle button click event with all the validations for the form (add cogo toasts)
function StartTestPage() {
    const [examineeArray, setExamineeArray] = useState([
        { id: '1', email: 'default' },
    ]);
    const [count, setCount] = useState(0);
    const usersForTest = [];

    useEffect(() => {
        axios
            .get(`${URL.API_BASE_URL}/users/examinees`)
            .then(res => {
                setExamineeArray(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [count]);

    const onUserSelect = selectedItem => {
        setCount(count + 1);
        usersForTest.push(selectedItem);
    };
    const onUserRemove = removedItem => {
        setCount(count - 1);
        usersForTest.pop(removedItem);
    };

    return (
        <div className="start-test-form">
            <Form>
                <Form.Group controlId="start-test-form.AddParticipants">
                    <Form.Label>Add participants to the test:</Form.Label>
                    <Multiselect
                        options={examineeArray}
                        displayValue="email"
                        closeIcon="square"
                        placeholder=""
                        onSelect={onUserSelect}
                        onRemove={onUserRemove}
                        style={{
                            chips: { background: 'var(--accent-color)' },
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="start-test-form.MinimumTime">
                    <Form.Label>Min. test time(minutes):</Form.Label>
                    <Form.Control type="email" placeholder="20" />
                </Form.Group>

                <Form.Group controlId="start-test-form.MinimumQuestions">
                    <Form.Label>Min. number of questions:</Form.Label>
                    <Form.Control type="email" placeholder="10" />
                </Form.Group>
                <button
                    type="submit"
                    className="btn-signin btn-dark btn-lg btn-block"
                >
                    Start test
                </button>
            </Form>
        </div>
    );
}

export default StartTestPage;
