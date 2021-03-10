import './HomePage.css';
import React from 'react';
import axios from 'axios';

const HomePage = function (props) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);

    return (
        <>
            {' '}
            <div className="home">HOME PAGE</div>
        </>
    );
};

export default HomePage;
