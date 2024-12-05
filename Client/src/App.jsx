// eslint-disable-next-line no-unused-vars
import React,{useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import  SignupPage  from './Auth/SignupPage';
import  LoginPage  from './Auth/LoginPage';
import NavBar from './components/NavBar';
import SectionBackgroundImages from './components/SectionBackgroundImage';
import { Dashboard } from './pages/Dashboard';
import Sidebar from './components/SideBar';
import AdditionalInfo from './components/AdditionalInfo';
import { useAuthContext } from './context/UseAuth';
import ProtectedRoute from './routes/ProtectedRoute';
import { VitalTask } from './pages/VitalTask';
import { Mytask } from './pages/MyTask';
import TaskCategory from './pages/TaskCategory';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import ScrollToTop from './utils/ScrollToTop';
import AddTaskPopup from './components/AddTaskPopup';
import { ToastContainer } from 'react-toastify';



 const AppContent = () => {
  
  const {user, userData} = useAuthContext();
  const location = useLocation();
  
  const routeBackgrounds = {
    '/': '/assets/images/Frame14.jpg',
    '/signup-page': '/assets/images/Frame14.jpg',
    '/additional-info': '/assets/images/Frame14.jpg',
    '/Dashboard': null,
    '/vital-task':null
  };
  const backgroundImage = routeBackgrounds[location.pathname];
  const noNavBars = ['/', '/signup-page', '/additional-info'];
  const shouldHaveNavBars = !noNavBars.includes(location.pathname);

  return (
<div>
      {/* Conditionally render SectionBackgroundImages only if backgroundImage exists */}
      {backgroundImage && (
        <SectionBackgroundImages
          src={backgroundImage}>
          <Routes location={location}>
            <Route path="/signup-page" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/additional-info" element={<AdditionalInfo user={user}  />} />
          </Routes>
        </SectionBackgroundImages>
      )}

      <div className='font-Inter '>
        <ToastContainer />
        <AddTaskPopup />
        {shouldHaveNavBars && (
          <>
          <NavBar /><Sidebar userData={userData} /></>
        )} {/* Conditionally render NavBar */}
        <Routes>
          <Route path="/Dashboard" element={<ProtectedRoute>
            <Dashboard  userData={userData}/>
          </ProtectedRoute>} />
          <Route path="/vital-task" element={<ProtectedRoute>
            <VitalTask  userData={userData}/>
          </ProtectedRoute>} />
          <Route path="/my-task" element={<ProtectedRoute>
            <Mytask  userData={userData}/>
          </ProtectedRoute>} />
          <Route path="/task-category" element={<ProtectedRoute>
            <TaskCategory userData={userData}/>
          </ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute>
            <Settings  userData={userData}/>
          </ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute>
            <Help  userData={userData}/>
          </ProtectedRoute>} />
        </Routes>
      </div>
    </div>
   
    
    
 
  )
};
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};
 export default App