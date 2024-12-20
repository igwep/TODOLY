import React from "react";
import { useLocation } from 'react-router-dom';
const ClipboardCheckedIcon = () => {
  const location = useLocation();

    return (
      <svg
        width="34px"
        height="34px"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke={`${location.pathname === '/my-task' ? '#FF6767' : '#ffffff'}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(4 3)"
        >
          <path d="m3.5 1.5c-.42139382 0-1.08806048 0-2 0-.55228475 0-1 .44771525-1 1v11c0 .5522848.44771525 1 1 1h10c.5522847 0 1-.4477152 1-1v-11c0-.55228475-.4477153-1-1-1-.8888889 0-1.55555556 0-2 0" />
          <path d="m4.5.5h4c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z" />
          <path d="m3.5 8.5 2 2 5-5" />
        </g>
      </svg>
    );
  };
  
  export default ClipboardCheckedIcon;
  