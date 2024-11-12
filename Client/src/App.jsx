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


 const AppContent = () => {
  const [fade, setFade] = useState(false);
  const {user, userData} = useAuthContext();
  const location = useLocation();
  useEffect(()=>{
    setFade(true)
  
    return () => {
      setFade(false);
      setTimeout(() => setFade(true), 700); // Timeout should match CSS transition duration
    };
  },[location]);
  const routeBackgrounds = {
    '/': '/assets/images/Frame14.jpg',
    '/signup-page': '/assets/images/Frame14.jpg',
    '/additional-info': '/assets/images/Frame14.jpg',
    '/Dashboard': null
  };
  const backgroundImage = routeBackgrounds[location.pathname];
  const noNavBars = ['/', '/signup-page', '/additional-info'];
  const shouldHaveNavBars = !noNavBars.includes(location.pathname);

  return (
<>
      {/* Conditionally render SectionBackgroundImages only if backgroundImage exists */}
      {backgroundImage && (
        <SectionBackgroundImages
          src={backgroundImage}
          className={`transition-opacity duration-300 font-Mons ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Routes location={location}>
            <Route path="/signup-page" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/additional-info" element={<AdditionalInfo user={user}  />} />
          </Routes>
        </SectionBackgroundImages>
      )}

      <div className='font-Inter bg-gray-100'>
        {shouldHaveNavBars && (
          <>
          <NavBar /><Sidebar userData={userData} /></>
        )} {/* Conditionally render NavBar */}
        <Routes>
          <Route path="/Dashboard" element={<ProtectedRoute>
            <Dashboard  userData={userData}/>
          </ProtectedRoute>} />
        </Routes>
      </div>
    </>
   
    
    
 
  )
};
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
 export default App