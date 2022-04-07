import styles from "./input.module.css";

const Input = ({ value, placeholder, label, onChange }) => {
  return (
    <div className={styles.ctn}>
      {label ? <div className={styles.label}>{label}</div> : ""}
      <div style={{
        position:'relative'
      }}>
        <div className='pixel-decorate'>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <input
          label={label}
          className={`${styles.input} inline-box`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Input;
