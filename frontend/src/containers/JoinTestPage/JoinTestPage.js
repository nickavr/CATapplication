import React from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import UserService from '../../Services/UserService';
import './JoinTestPage.css';

const URL = require('../../config/url-info.json');

function JoinTestPage() {
    let user = UserService.getUserFromStorage();
    const handleJoinTest = () => {
        axios
            .post(
                `${URL.API_BASE_URL}/user/token`,
                {},
                { params: { email: user.email } }
            )
            .then(res => {
                console.log(res);

                if (res.data) {
                    localStorage.setItem('testToken', JSON.stringify(res.data));
                    //req with router.post('/join-test', JWTmiddleware.authenticateToken);
                    axios
                        .get(`${URL.API_BASE_URL}/join-test`, {
                            headers: {
                                Authorization: `Bearer ${JSON.parse(
                                    localStorage.getItem('testToken')
                                )}`,
                            },
                        })
                        .then(res => {
                            console.log(res.data);
                            //TODO: token is working, start test logic <3
                            cogoToast.success('Test has started', {
                                hideAfter: 5,
                                position: 'top-center',
                                heading: 'Good luck!',
                            });
                        })
                        .catch(err => console.log(err.message));
                } else {
                    cogoToast.warn(
                        'The test has not started yet or you have not been assigned to any test.',
                        {
                            hideAfter: 5,
                            position: 'top-center',
                            heading: 'Cannot start test',
                        }
                    );
                }
            });
    };

    return (
        <div className="join-test-container">
            <h2 className="join-test-greetings-message">
                Welcome to adaptest, if you have been assigned to a test, please
                click start
            </h2>
            <button
                className="btn-signin btn-lg btn-block"
                onClick={() => handleJoinTest()}
            >
                Start
            </button>
        </div>
    );
}

export default JoinTestPage;
