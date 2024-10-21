import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupPage } from './Auth/SignupPage';
import SectionBackgroundImages from './components/SectionBackgroundImage';


 const App = () => {
  return (
   <Router>
    <div>

    </div>
    <Routes>
      
      <Route path="/" element={ <SectionBackgroundImages
              src="/assets/images/Frame14.jpg"
              style={{  }}
            >
              <SignupPage />
            </SectionBackgroundImages>}></Route>
      
    </Routes>
   </Router>  
  )
}
 export default App