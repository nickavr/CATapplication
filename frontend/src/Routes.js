import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import StartTestPage from './containers/StartTestPage/StartTestPage';
import QuestionComponent from './components/QuestionComponent/QuestionComponent';
import JoinTestPage from './containers/JoinTestPage/JoinTestPage';
import SideMenu from './components/SideBarMenu/SBM';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';

export default function Routes() {
    const [testState, setTestState] = useState('test state ;)');

    const changeState = () => {
        setTestState('new testState');
    };

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <div className="pages">
                    <SideMenu />
                    <Switch>
                        <ProtectedRoute path="/home">
                            <HomePage
                                testState={testState}
                                changeState={changeState}
                            />
                        </ProtectedRoute>
                        <ProtectedRoute
                            path="/start-test"
                            exact
                            component={StartTestPage}
                        ></ProtectedRoute>
                        <ProtectedRoute
                            path="/join-test"
                            exact
                            component={JoinTestPage}
                        ></ProtectedRoute>
                        <Route
                            path="/question"
                            exact
                            component={QuestionComponent}
                        />
                    </Switch>
                </div>
            </Switch>
        </Router>
    );
}
