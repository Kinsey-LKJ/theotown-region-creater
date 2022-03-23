import Button from "../components/button/button"

const Test = () => {
    return (
        <Button type="newStyle" style={{
            '--name-border-shadow-color':'--theotown-creater-primary-shadow',
            '--name-border-color':'--theotown-creater-primary-bright'
        }}>测试测试测试测试测试</Button>
    )
}

export default Test