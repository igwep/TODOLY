import React from 'react';

const Username = ({ width = 28, height = 28, fill = "#212427", stroke = "none" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 30 30"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5C16.3261 5 17.5979 5.52678 18.5355 6.46447C19.4732 7.40215 20 8.67392 20 10C20 11.3261 19.4732 12.5979 18.5355 13.5355C17.5979 14.4732 16.3261 15 15 15C13.6739 15 12.4021 14.4732 11.4645 13.5355C10.5268 12.5979 10 11.3261 10 10C10 8.67392 10.5268 7.40215 11.4645 6.46447C12.4021 5.52678 13.6739 5 15 5ZM15 17.5C20.525 17.5 25 19.7375 25 22.5V25H5V22.5C5 19.7375 9.475 17.5 15 17.5Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
);

export default Username;
