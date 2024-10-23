import React from 'react';

const LastName = ({ width = 28, height = 28, fill = "none", stroke = "black" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 28 28"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0003 10.4999C16.2555 10.4999 18.0837 8.67175 18.0837 6.41659C18.0837 4.16142 16.2555 2.33325 14.0003 2.33325C11.7452 2.33325 9.91699 4.16142 9.91699 6.41659C9.91699 8.67175 11.7452 10.4999 14.0003 10.4999Z"
      stroke={stroke}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.3335 23.9166C2.3335 18.7617 7.03458 14.5833 12.8335 14.5833"
      stroke={stroke}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.0835 24.4999L23.9168 18.6666L21.5835 16.3333L15.7502 22.1666V24.4999H18.0835Z"
      stroke={stroke}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LastName;
