import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import  SignupPage  from './Auth/SignupPage';
import  LoginPage  from './Auth/LoginPage';
import NavBar from './components/NavBar';
import SectionBackgroundImages from './components/SectionBackgroundImage';
import { Dashboard } from './pages/Dashboard';
import Sidebar from './components/SideBar';
import AdditionalInfo from './components/AdditionalInfo';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from './components/Loader/Loader';



 const AppContent = () => {
  const [fade, setFade] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading) return <div><Loader /></div>;

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
            <Route path="/additional-info" element={<AdditionalInfo user={user} />} />
          </Routes>
        </SectionBackgroundImages>
      )}

      <div className='font-Inter bg-gray-200'>
        {shouldHaveNavBars && (
          <>
          <NavBar /><Sidebar /></>
        )} {/* Conditionally render NavBar */}
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