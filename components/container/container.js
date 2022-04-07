import styles from "./container.module.css";

const Container = ({ children, className, style , pixelTheme = 'box'}) => {
  return (
    <div className={`${styles.ctn} ${className} ${pixelTheme}`} style={style}>
      <div className="pixel-decorate">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      {children}
    </div>
  );
};

export default Container;
