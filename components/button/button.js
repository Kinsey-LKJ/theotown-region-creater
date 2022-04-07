import styles from "./button.module.css";

const Button = ({ children, onClick, type = "primary", download, href ,style}) => {
  return (
    <a
      className={`${styles.button} ${styles[type]} box`}
      onClick={onClick}
      download={download}
      href={href}
      style={style}
    >
      <div className="pixel-decorate">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      {children}
    </a>
  );
};

export default Button;
