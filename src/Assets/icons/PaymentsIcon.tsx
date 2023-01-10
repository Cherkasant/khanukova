import React from "react";

export const PaymentsIcon = ({ width = "32", height = "24" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 9.33301H31V18.6663C31 20.552 31 21.4948 30.4142 22.0806C29.8284 22.6663 28.8856 22.6663 27 22.6663H5C3.11438 22.6663 2.17157 22.6663 1.58579 22.0806C1 21.4948 1 20.552 1 18.6663V9.33301Z"
        fill="#ECF1F6"
      />

      <rect
        x="1"
        y="1"
        width="30"
        height="21.6667"
        rx="2"
        stroke="#4270A7"
        strokeWidth="1.2"
      />

      <path
        d="M7.66663 16H7.68329"
        stroke="#4270A7"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M1 9.33301L31 9.33301"
        stroke="#4270A7"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
