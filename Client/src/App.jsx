import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import  SignupPage  from './Auth/SignupPage';
import  LoginPage  from './Auth/LoginPage';
import SectionBackgroundImages from './components/SectionBackgroundImage';


 const AppContent = () => {
  const [fade, setFade] = useState(false);
  const location = useLocation();
  useEffect(()=>{
    setFade(true)
  

    return () => {
      setFade(false);
      setTimeout(() => setFade(true), 700); // Timeout should match CSS transition duration
    };
  },[location])

  return (

    <SectionBackgroundImages  src="/assets/images/Frame14.jpg" className={`transition-opacity duration-300 font-Mons ${
      fade ? 'opacity-100' : 'opacity-0'
    }`}>
    <Routes location={location}>
      
      <Route path="/" element={<SignupPage />}></Route>
      <Route path="/login-page" element={<LoginPage />}></Route>
            
    </Routes>
    </SectionBackgroundImages>
    
 
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