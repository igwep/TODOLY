import React from 'react';
import { useLocation } from 'react-router-dom';


const ExclamationMarkIcon = () => {
  const location = useLocation();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 16 16" id="exclamation-mark">
      <path fill={`${location.pathname === '/vital-task' ? '#FF6767' :'#ffffff'}`} d="M5.96072,4.45718 C5.72131,3.18031 6.70088,2 8,2 C9.29912,2 10.2787,3.18031 10.0393,4.45718 L9.18429,9.01713 C9.07743,9.58702 8.57983,10 8,10 C7.42017,10 6.92257,9.58703 6.81571,9.01713 L5.96072,4.45718 Z M9.5,12.5 C9.5,13.3284 8.82843,14 8,14 C7.17157,14 6.5,13.3284 6.5,12.5 C6.5,11.6716 7.17157,11 8,11 C8.82843,11 9.5,11.6716 9.5,12.5 Z"></path>
    </svg>
  );
};

export default ExclamationMarkIcon;
