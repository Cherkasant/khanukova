import React from "react";

export const ProjectsIcon = ({width="32", height="28", fill="#ECF1F6"}) => {
   return (
      <svg
         width={width}
         height={height}
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0.666992H11.6667L15 9.00033H0V0.666992Z"
            fill={fill}
         />
      </svg>
   );
};