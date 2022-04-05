import Button from "../components/button/button";
import Select from "../components/select/select";

const Test = () => {
  return (
    <div
      style={{
        "--name-shadow-color": "var(--theotown-creater-primary-shadows)",
        "--name-border-color": "var(--theotown-creater-primary-bright)",
        "--name-background-color": "var(--theotown-creater-primary)",
        //   color:"black"
      }}
    >
      <Button type="newStyle">我是一个按钮</Button>
      <div
        style={{
          marginTop: "24px",
          width: "200px",
        }}
      >
        <Select ></Select>
      </div>
    </div>
  );
};

export default Test;
