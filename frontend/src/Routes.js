import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import ProtectedRoute from './ProtectedRoute';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <ProtectedRoute
                    path="/home"
                    exact
                    component={HomePage}
                ></ProtectedRoute>
            </Switch>
        </Router>
    );
}
