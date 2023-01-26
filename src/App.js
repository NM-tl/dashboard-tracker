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
import { useState, useEffect } from 'react';
import Loader from './common/components/Loader/Loader';
import ErrorPage from './common/components/ErrorPage/ErrorPage';


function App() {
  const [loading, setLoading] = useState(true);
  
  // if (spinner) {
  //   setTimeout(() => {
  //     spinner.style.display = "none";
  //     setLoading(false);
  //   }, 2000);
  // }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);


  return (
    !loading ? 
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
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </Router>
        </AuthContextProvider>
      </div> :
      <Loader />
  );
}

export default App;
