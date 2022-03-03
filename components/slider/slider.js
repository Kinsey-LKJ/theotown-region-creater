import styles from "./slider.module.css";

const Slider = ({ value, max = 8, min = 1, label, onChange, markes }) => {
  const createArray = (start, end) => {
    let array = [];
    if (markes) {
      if (Object(markes)) {
        for (let i = start; i <= end; i++) {
          // array.push(i);
          if (markes[i]) {
            array.push(markes[i]);
          } else {
            array.push("");
          }
        }
      } else {
        for (let i = start; i <= end; i++) {
          array.push(i);
        }
      }
    }

    return array;
  };
  const handleValueChange = (value) => {
    onChange(Number(value));
  };
  return (
    <div className={styles.ctn}>
      {label ? <div className={styles.label}>{label}</div> : ""}
      <div className={styles.sliderBox}>
        <input
          className={styles.slider}
          type="range"
          max={max}
          min={min}
          value={value}
          onChange={(e) => {
            handleValueChange(e.target.value);
          }}
        />
      </div>

      <div className={styles.markes}>
        {createArray(min, max).map((item, index) => {
          return (
            <div key={item} className={`${styles.markesItem} ${item === value ? 'active' : ''}`}
            >
              {index === 0 ? min : item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
