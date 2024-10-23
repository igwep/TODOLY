import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import  SignupPage  from './Auth/SignupPage';
import  LoginPage  from './Auth/LoginPage';
import NavBar from './components/NavBar';
import SectionBackgroundImages from './components/SectionBackgroundImage';
import { Dashboard } from './pages/Dashboard';


 const AppContent = () => {
  const [fade, setFade] = useState(false);
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
    '/login-page': '/assets/images/Frame14.jpg',
    '/Dashboard': null
  };
  const backgroundImage = routeBackgrounds[location.pathname];
  const noNavBars = ['/', '/login-page'];
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
            <Route path="/" element={<SignupPage />} />
            <Route path="/login-page" element={<LoginPage />} />
          </Routes>
        </SectionBackgroundImages>
      )}

      <div>
        {shouldHaveNavBars && <NavBar />} {/* Conditionally render NavBar */}
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
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