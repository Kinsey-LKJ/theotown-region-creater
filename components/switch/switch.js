import styles from "./switch.module.css";
import { v4 as uuidv4 } from "uuid";

const Switch = ({ checked,field = uuidv4(), onChange }) => {
  return (
    <div className={styles.ctn}>
      <input checked={checked} type="checkbox" name="" id={`components-name-${field}`} onChange={(e) => {
          onChange(e.target.checked)
      }}/>
      <div>
          {
              checked ? '开' : '关'
          }
      </div>
      <label htmlFor={`components-name-${field}`}></label>
    </div>
  );
};

export default Switch;
