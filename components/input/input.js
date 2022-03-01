import styles from "./input.module.css";

const Input = ({ placeholder, label }) => {
  return (
    <div>
        {
            label ? <div className={styles.label}>{label}</div> : ''
        }
      <input
        label={label}
        className={styles.input}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
