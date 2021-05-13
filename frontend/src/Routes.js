import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import StartTestPage from './containers/StartTestPage/StartTestPage';
import QuestionComponent from './components/QuestionComponent/QuestionComponent';
import JoinTestPage from './containers/JoinTestPage/JoinTestPage';
import ExaminerStatsPage from './containers/ExaminerStatisticsPage/ExaminerStatisticsPage';
import TestResults from './containers/ExaminerTestResults/TestResults';
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
                        <ProtectedRoute path="/test-results">
                            <TestResults />
                        </ProtectedRoute>
                        <ProtectedRoute path="/start-test">
                            <StartTestPage />
                        </ProtectedRoute>
                        <ProtectedRoute path="/join-test">
                            <JoinTestPage />
                        </ProtectedRoute>
                        <ProtectedRoute path="/question">
                            <QuestionComponent />
                        </ProtectedRoute>
                        <ProtectedRoute path="/statistics">
                            <ExaminerStatsPage />
                        </ProtectedRoute>
                    </Switch>
                </div>
            </Switch>
        </Router>
    );
}
