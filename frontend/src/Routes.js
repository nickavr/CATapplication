import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import ProtectedRoute from './ProtectedRoute';
import SideMenu from './components/SideBarMenu/SBM';

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
                    </Switch>
                </div>
            </Switch>
        </Router>
    );
}
