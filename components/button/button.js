import styles from "./button.module.css";

const Button = ({ children, onClick, type = "primary", download, href }) => {
  return (
    <a
      className={`${styles.button} ${styles[type]}`}
      onClick={onClick}
      download={download}
      href={href}
    >
      <div>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        {children}
      </div>
    </a>
  );
};

export default Button;
