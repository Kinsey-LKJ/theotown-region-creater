import ReactDOM from "react-dom";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import Button from "../components/button/button";
import CheckBox from "../components/checkbox/checkbox";
import Container from "../components/container/container";
import Input from "../components/input/input";
import Modal from "../components/modal/modal";
import Slider from "../components/slider/slider";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [citySize, setCitySize] = useState(1);
  const [regionSize, setRegionSize] = useState(8);
  const changeCitySizeState = (value) => {
    if (value === 1 || value === 2 || value === 4 || value === 8) {
      setCitySize(value);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);

  const changeRegionSizeState = (value) => {
    if (value % 8 === 0) {
      console.log(value);
      setRegionSize(value);
    }
  };

  return (
    <Container className={styles.container}>
      <h1>TheoTown 地图创建工具</h1>
      <Input placeholder={"请输入种子"} label="种子"></Input>
      <CheckBox>开启树木</CheckBox>
      <CheckBox>开启山地</CheckBox>
      <Slider
        label="最小城市单元（ 1 = 64 * 64 ）"
        value={citySize}
        onChange={changeCitySizeState}
        markes={{
          1: 1,
          2: 2,
          4: 4,
          8: 8,
        }}
      ></Slider>

      <Slider
        label="区域大小（ 1 = 64 * 64 ）"
        value={regionSize}
        onChange={changeRegionSizeState}
        min={8}
        max={64}
        markes={{
          8: 8,
          16: 16,
          24: 24,
          32: 32,
          40: 40,
          48: 48,
          56: 56,
          64: 64,
        }}
      ></Slider>
      <Button>立即生成</Button>

      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        显示弹窗
      </Button>
      <Button
        onClick={() => {
          Modal.confirm({
            text: "123",
            typed: {
              strings: [
                "这是一个可以生成用于在 theotown 的控制台中新建地图的代码的工具，请确保已经打开实验室功能。",
              ],
              showCursor: true,
              cursorChar: "->",
              typeSpeed: 10,
            },
            onClose: () => {
              Modal.confirm({
                text: "123",
                typed: {
                  strings: [
                    "如果要使用控制台，请参考...",
                  ],
                  showCursor: true,
                  cursorChar: "->",
                  typeSpeed: 10,
                },
              });
            },
          });
        }}
      >测试Modal.mechod</Button>
      <Modal
        onClose={() => {
          setModalOpen(false);
        }}
        isOpen={modalOpen}
        typed={{
          strings: [
            "这是一个可以生成用于在 theotown 的控制台中新建地图的代码的工具，请确保已经打开实验室功能。",
          ],
          showCursor: true,
          cursorChar: "->",
          typeSpeed: 10,
        }}
        contentClassName={styles.wellcomeModal}
      >
        Hello
      </Modal>
    </Container>
  );
}
