import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/admin/HomePage/HomePage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <Route path="/home" exact component={HomePage}></Route>
            </Switch>
        </Router>
    );
}
