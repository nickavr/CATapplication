import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import StartTestPage from './containers/StartTestPage/StartTestPage';
import SideMenu from './components/SideBarMenu/SBM';
import ProtectedRoute from './ProtectedRoute';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <div>
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
                    </Switch>
                </div>
            </Switch>
        </Router>
    );
}
