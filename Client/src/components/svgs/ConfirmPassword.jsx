import React from 'react';

const ConfirmPassword = ({ width = 28, height = 28, fill = "black", stroke = "none" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 30 30"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 21.25C14.337 21.25 13.7011 20.9866 13.2322 20.5178C12.7634 20.0489 12.5 19.413 12.5 18.75C12.5 17.3625 13.6125 16.25 15 16.25C15.663 16.25 16.2989 16.5134 16.7678 16.9822C17.2366 17.4511 17.5 18.087 17.5 18.75C17.5 19.413 17.2366 20.0489 16.7678 20.5178C16.2989 20.9866 15.663 21.25 15 21.25ZM22.5 25V12.5H7.5V25H22.5ZM22.5 10C23.163 10 23.7989 10.2634 24.2678 10.7322C24.7366 11.2011 25 11.837 25 12.5V25C25 25.663 24.7366 26.2989 24.2678 26.7678C23.7989 27.2366 23.163 27.5 22.5 27.5H7.5C6.83696 27.5 6.20107 27.2366 5.73223 26.7678C5.26339 26.2989 5 25.663 5 25V12.5C5 11.1125 6.1125 10 7.5 10H8.75V7.5C8.75 5.8424 9.40848 4.25269 10.5806 3.08058C11.7527 1.90848 13.3424 1.25 15 1.25C15.8208 1.25 16.6335 1.41166 17.3918 1.72575C18.1501 2.03984 18.8391 2.50022 19.4194 3.08058C19.9998 3.66095 20.4602 4.34994 20.7742 5.10823C21.0883 5.86651 21.25 6.67924 21.25 7.5V10H22.5ZM15 3.75C14.0054 3.75 13.0516 4.14509 12.3483 4.84835C11.6451 5.55161 11.25 6.50544 11.25 7.5V10H18.75V7.5C18.75 6.50544 18.3549 5.55161 17.6517 4.84835C16.9484 4.14509 15.9946 3.75 15 3.75Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
);

export default ConfirmPassword;
