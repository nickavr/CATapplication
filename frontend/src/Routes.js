import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import StartTestPage from './containers/StartTestPage/StartTestPage';
import QuestionComponent from './components/QuestionComponent/QuestionComponent';
import JoinTestPage from './containers/JoinTestPage/JoinTestPage';
import SideMenu from './components/SideBarMenu/SBM';
import ProtectedRoute from './ProtectedRoute';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <div className="pages">
                    <SideMenu />
                    <Switch>
                        <ProtectedRoute
                            path="/home"
                            exact
                            component={HomePage}
                        ></ProtectedRoute>
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
