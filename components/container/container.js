import styles from './container.module.css'

const Container = ({children, className}) => {
    return (
        <div className={`${styles.ctn} ${className}`}>
            {children}
        </div>
    )
}

export default Container