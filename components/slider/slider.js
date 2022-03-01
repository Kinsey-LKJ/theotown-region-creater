import styles from "./slider.module.css";

const Slider = ({ max = 8, min = 1 ,label}) => {
  const createArray = (start,end) => {
    let array = [];
    for (let i = start;i <= end;i++){
      array.push(i)
    }

    return array
  }
  return (
    <div className={styles.ctn}>
        {
            label ? <div className={styles.label}>{label}</div> : ''
        }
      <div className={styles.sliderBox}>
        <input
          className={styles.slider}
          type="range"
          max={max}
          min={min}
          defaultValue={1}
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
      </div>

      <div className={styles.scales}>
        {createArray(min,max).map(
          (item, index) => {
            return <div>{index === 0 ? min : item}</div>;
          }
        )}
      </div>
    </div>
  );
};

export default Slider;
