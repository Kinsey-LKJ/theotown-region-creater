"use client"

import { useEffect,useState } from "react";
import styles from "./switch.module.css";
import { v4 as uuidv4 } from "uuid";


const Switch = ({ checked, field = uuidv4(), onChange }) => {
  const [offset, setOffset] = useState(false);
  useEffect(() => {
    let userAgent = navigator.userAgent;
    if(userAgent.indexOf("Chrome") > -1) {
      return
    }

    if(userAgent.indexOf("Safari") > -1){
      setOffset(true)
    }

    return
  },[]);
  return (
    <div className={styles.ctn}>
      <div className="pixel-decorate">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <input
        checked={checked}
        type="checkbox"
        name=""
        id={`components-name-${field}`}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <div className={`box ${styles.icon}`} style={{
        transform: offset ? `translateY(calc(-1 * var(--name-private-border-width)))` : 'auto' 
      }}>
        {checked ? "开" : "关"}{" "}
        <div className="pixel-decorate">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>

      <label
        htmlFor={`components-name-${field}`}
        className="inline-box"
      ></label>
    </div>
  );
};

export default Switch;
