import React from "react";
import { useLocation } from "react-router-dom";

const BulletPointIcon = () => {
  const location = useLocation();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 290.5 290.5"
        fill="currentColor" // Use "currentColor" to allow flexibility with the icon's color
      >
        <g fill={`${location.pathname === '/task-category' ? '#FF6767' : '#ffffff '}`} fillRule="evenodd" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round">
          <path d="M74,66.001h209c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5H74c-4.142,0-7.5,3.358-7.5,7.5S69.858,66.001,74,66.001z" />
          <path d="M283,138H74c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h209c4.143,0,7.5-3.358,7.5-7.5C290.5,141.358,287.143,138,283,138z" />
          <path d="M283,224.999H74c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h209c4.143,0,7.5-3.358,7.5-7.5S287.143,224.999,283,224.999z" />
          <path d="M26,32.501c-14.336,0-26,11.664-26,26s11.664,26,26,26c14.336,0,26-11.664,26-26S40.336,32.501,26,32.501z M26,69.501c-6.075,0-11-4.925-11-11c0-6.075,4.925-11,11-11c6.075,0,11,4.925,11,11C37,64.576,32.075,69.501,26,69.501z" />
          <path d="M26,119.5c-14.336,0-26,11.664-26,26c0,14.336,11.664,26,26,26c14.336,0,26-11.664,26-26C52,131.164,40.336,119.5,26,119.5z M26,156.5c-6.075,0-11-4.925-11-11c0-6.075,4.925-11,11-11c6.075,0,11,4.925,11,11C37,151.575,32.075,156.5,26,156.5z" />
          <path d="M26,205.999c-14.336,0-26,11.664-26,26s11.664,26,26,26c14.336,0,26-11.664,26-26S40.336,205.999,26,205.999z M26,242.999c-6.075,0-11-4.925-11-11s4.925-11,11-11c6.075,0,11,4.925,11,11S32.075,242.999,26,242.999z" />
        </g>
      </svg>
    );
  };
  
  export default BulletPointIcon;
  