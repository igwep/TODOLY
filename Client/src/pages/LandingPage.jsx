// eslint-disable-next-line no-unused-vars
import React from 'react';
import LandingNavbar from '../components/landingpage/LandingNavbar.jsx';
import HeroSection from '../components/landingpage/landingPageHero.jsx';
import Benefits from '../components/landingpage/Benefits.jsx';
import { Addtask } from '../components/landingpage/Addtask.jsx';
import Price from '../components/landingpage/Price.jsx';
import SubscribeSection from '../components/landingpage/SubscribeSection.jsx';
import Footer from '../components/landingpage/Footer.jsx';

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="benefits">
        <Benefits />
      </div>
      <div id="addtask">
        <Addtask />
      </div>
      <div id="price">
        <Price />
      </div>
      <div id="subscribe">
        <SubscribeSection />
      </div>
      <Footer/>
    </>
  );
};

export default LandingPage;
