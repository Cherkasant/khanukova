import React from "react";

export const CloseMenuIcon = ({ width = "40", height = "40" }) => {
   return (
      <svg
         width={width}
         height={height}
         viewBox="0 0 40 40"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >

         <rect x="40" y="40" width="40" height="40" rx="5" transform="rotate(-180 40 40)" fill="#ECF1F6"/>
         <path d="M25 30L15 20L25 10" stroke="#4270A7"/>
   </svg>
   );
};