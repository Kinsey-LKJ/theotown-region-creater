import styles from './button.module.css'

const Button = ({children,onClick,type = 'primary'}) => {
    return (
        <a className={`${styles.button} ${styles[type]}`} onClick={onClick}>{children}</a>
    )
}

export default Button