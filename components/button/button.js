import styles from './button.module.css'

const Button = ({children,onClick}) => {
    return (
        <a className={styles.ctn} onClick={onClick}>{children}</a>
    )
}

export default Button