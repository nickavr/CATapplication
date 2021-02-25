import './LandingPage.css';
import React from 'react';

function LandingPage() {
    return (
        <header className="landingPage-container">
            <div className="hero-textbox">
                <h1>
                    Welcome to AdapTest. <br />
                    Use your institutional email.
                </h1>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        </header>
    );
}

export default LandingPage;
