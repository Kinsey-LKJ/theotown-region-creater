import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/button";
import CheckBox from "../components/checkbox/checkbox";
import Container from "../components/container/container";
import Input from "../components/input/input";
import Slider from "../components/slider/slider";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container className={styles.container}>
      <h1>TheoTown 地图创建工具</h1>
      <Input placeholder={"请输入种子"} label="种子"></Input>
      <CheckBox>开启树木</CheckBox>
      <CheckBox>开启山地</CheckBox>
      <Slider label="最小城市单元（ 1 = 64 * 64 ）"></Slider>
      <Button>立即生成</Button>
    </Container>
  );
}
