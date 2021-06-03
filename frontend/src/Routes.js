import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import ManageQuestions from './containers/ManageQuestionsPage/ManageQuestionsPage';
import StartTestPage from './containers/StartTestPage/StartTestPage';
import QuestionComponent from './components/QuestionComponent/QuestionComponent';
import JoinTestPage from './containers/JoinTestPage/JoinTestPage';
import ExaminerStatsPage from './containers/ExaminerStatisticsPage/ExaminerStatisticsPage';
import TestResults from './containers/ExaminerTestResults/TestResults';
import CandidateAnalytics from './containers/CandidateAnalyticsPage/CandidateAnalytics';
import ResourcesPage from './containers/ResourcesPage/ResourcesPage';
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
                        <ProtectedRoute path="/manage-questions">
                            <ManageQuestions />
                        </ProtectedRoute>
                        <ProtectedRoute path="/analytics">
                            <CandidateAnalytics />
                        </ProtectedRoute>
                        <ProtectedRoute path="/resources">
                            <ResourcesPage />
                        </ProtectedRoute>
                    </Switch>
                </div>
            </Switch>
        </Router>
    );
}
