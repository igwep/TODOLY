// eslint-disable-next-line no-unused-vars
import React from 'react';
import LandingNavbar from '../components/landingpage/LandingNavbar';
import HeroSection from '../components/landingpage/HeroSection';
import Benefits from '../components/landingpage/Benefits';
import { Addtask } from '../components/landingpage/Addtask';
import Price from '../components/landingpage/Price';
import SubscribeSection from '../components/landingpage/SubscribeSection';
import Footer from '../components/landingpage/Footer';

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
