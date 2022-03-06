import styles from "./input.module.css";

const Input = ({value, placeholder, label ,onChange}) => {
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
        value={value}
        onChange={
          (e) => {
            onChange(e.target.value)
          }
        }
      />
    </div>
  );
};

export default Input;
