import './HomePage.css';
import React from 'react';
import axios from 'axios';

const HomePage = function (props) {
    //let user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(user);

    console.log(props.testState);

    return (
        <div>
            <div className="home">
                <h1>{props.testState}</h1>
                <button className="btn" onClick={() => props.changeState()}>
                    press
                </button>
            </div>
        </div>
    );
};

export default HomePage;
