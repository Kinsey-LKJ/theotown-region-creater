import { useEffect, useRef, useState } from "react";
import styles from "./spin.module.css";

const Spin = ({className}) => {
  //   const svgRef = useRef(null);
  //   const [mainColor,setMainColor] = useState(null)
  //   useEffect(() => {
  //     let css = getComputedStyle(svgRef.current).getPropertyValue(
  //       "--name-private-fill-main"
  //     );
  //     console.log(css);
  //   }, []);
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.ctn} ${className}`}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 4H16H17V5V6V7V8V9V10V11H16H15V10V9V8V7V6V5V4Z"
        fill=""
        style={{
          opacity: 1,
        }}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23 7H24H25V8V9H24V10H23V11H22V12H21V13H20H19V12V11H20V10H21V9H22V8H23V7Z"
        style={{
          opacity: 0.875,
        }}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 15H22H23H24H25H26H27H28V16V17H27H26H25H24H23H22H21V16V15Z"
        style={{
          opacity: 0.75,
        }}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 19H20H21V20H22V21H23V22H24V23H25V24V25H24H23V24H22V23H21V22H20V21H19V20V19Z"
        style={{
          opacity: 0.625,
        }}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 21H16H17V22V23V24V25V26V27V28H16H15V27V26V25V24V23V22V21Z"
        style={{
          opacity: 0.5,
        }}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 19H12H13V20V21H12V22H11V23H10V24H9V25H8H7V24V23H8V22H9V21H10V20H11V19Z"
        style={{
          opacity: 0.375,
        }}
      />

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 15H5H6H7H8H9H10H11V16V17H10H9H8H7H6H5H4V16V15Z"
        style={{
          opacity: 0.25,
        }}
      />

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 7H8H9V8H10V9H11V10H12V11H13V12V13H12H11V12H10V11H9V10H8V9H7V8V7Z"
        style={{
          opacity: 0.125,
        }}
      />
    </svg>
  );
};

export default Spin;
