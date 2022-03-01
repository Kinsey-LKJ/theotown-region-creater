import styles from "./checkbox.module.css";
import { v4 as uuidv4 } from 'uuid';
const CheckBox = ({ children ,field = uuidv4()}) => {
  return (
    <div className={styles.ctn} >
      <input type="checkbox" id={`components-name-${field}`} />
      <div className={styles.checkedElement}></div>
      <label className={styles.checkBoxIcon} for={`components-name-${field}`}></label>
      <label for={`components-name-${field}`}> {children}</label>
    </div>
  );
};

export default CheckBox;
