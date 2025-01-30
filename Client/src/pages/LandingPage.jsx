// eslint-disable-next-line no-unused-vars
import React from 'react';
import LandingNavbar from '../components/landingpage/LandingNavbar.jsx';
import HeroSection from '../components/landingpage/landingPageHero.jsx';
import Benefits from '../components/landingpage/Benefits.jsx';
import { Addtask } from '../components/landingpage/Addtask.jsx';
import Price from '../components/landingpage/Price.jsx';

const LandingPage = () => {
  return (
    <>
    <LandingNavbar/>
    <HeroSection/>
    <Benefits/>
    <Addtask/>
    <Price/>
    </>
  )
};

export default LandingPage;
