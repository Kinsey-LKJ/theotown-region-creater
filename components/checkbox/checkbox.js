import styles from "./checkbox.module.css";
import { v4 as uuidv4 } from 'uuid';
const CheckBox = ({ checked,children ,field = uuidv4(),onChange}) => {
  return (
    <div className={styles.ctn} >
      <input checked={checked} type="checkbox" id={`components-name-${field}`} onChange={(e) => {
        onChange(e.target.checked)
      }}/>
      <div className={styles.checkedElement}></div>
      <label className={styles.checkBoxIcon} htmlFor={`components-name-${field}`}></label>
      <label htmlFor={`components-name-${field}`}> {children}</label>
    </div>
  );
};

export default CheckBox;
