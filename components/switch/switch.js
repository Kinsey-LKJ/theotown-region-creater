import styles from "./switch.module.css";
import { v4 as uuidv4 } from "uuid";

const Switch = ({ checked, field = uuidv4(), onChange }) => {
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
      <div className={`box ${styles.icon}`}>
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
