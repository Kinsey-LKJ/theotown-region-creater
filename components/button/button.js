import styles from './button.module.css'

const Button = ({children}) => {
    return (
        <a className={styles.ctn}>{children}</a>
    )
}

export default Button