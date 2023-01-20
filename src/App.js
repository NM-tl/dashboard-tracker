import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Authorization from './modules/Authorization/Authorization';
import Protected from './Protected'
import Dashboard from './modules/Dashboard/Dashboard';
import AddTask from './modules/AddTask/AddTaskPage';
import DoneTasks from './modules/DoneTasks/DoneTasksPage';
import TaskPage from './modules/TaskPage/TaskPage';
import UserProfile from './modules/UserProfile/UserProfile';
import UserStatistic from './modules/UserStatistic/UserStatistic';
import UserRewards from './modules/UserRewards/UserRewards';
import DoneTaskPage from './modules/DoneTaskPage/DoneTaskPage';
import { AuthContextProvider } from './context/AuthContext'


function App() {
  return (
    
      <div className="App">
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route exact path="/authorization" element={<Authorization />} />
              <Route exact path="/dashboard" element={<Protected><Dashboard /></Protected>} />
              <Route exact path="/taskpage/:id" element={<TaskPage />} />
              <Route exact path="/profile" element={<UserProfile />} />
              <Route exact path="/rewards" element={<UserRewards />} />
              <Route exact path="/statistic" element={<UserStatistic />} />
              <Route exact path="/addtask" element={<AddTask />} />
              <Route exact path="/donetasks" element={<DoneTasks />} />
              <Route exact path="/donetask/:id" element={<DoneTaskPage />} />
              <Route path="*" element={<Navigate to="/authorization" replace />} />
            </Routes>
          </Router>
        </AuthContextProvider>
      </div>
    
  );
}

export default App;
