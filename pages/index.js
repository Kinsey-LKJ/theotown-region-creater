import ReactDOM from "react-dom";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Button from "../components/button/button";
import CheckBox from "../components/checkbox/checkbox";
import Container from "../components/container/container";
import Input from "../components/input/input";
import Modal from "../components/modal/modal";
import Slider from "../components/slider/slider";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    Modal.info({
      text: "123",
      typed: {
        strings: [
          "这是一个可以生成用于在 theotown 的控制台中新建地图的代码的工具，请确保已经打开实验室功能。",
        ],
        showCursor: true,
        cursorChar: "->",
        typeSpeed: 10,
      },
      okButtonText: "我知道了",
      onOk: () => {
        Modal.info({
          text: "123",
          typed: {
            strings: ["如果要使用控制台，请参考..."],
            showCursor: true,
            cursorChar: "->",
            typeSpeed: 10,
          },
          okButtonText: "我知道了",
        });
      },
    });
  }, []);
  const [name, setNameValue] = useState("");
  const [seedValue, setSeedValue] = useState("");
  const [desert, setDesert] = useState(false);
  const [terrain, setTerrain] = useState(false);
  const [trees, setTrees] = useState(false);
  const [decoration, setDecoration] = useState(false);
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

  const rondomSeed = (number) => {
    let arr = new Array();
    let arr1 = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");

    for (var i = 0; i < number; i++) {
      var n = Math.floor(Math.random() * 10);
      arr[i] = arr1[n];
    }
    setSeedValue(arr.join(""));
  };

  const getMap = (regionSize, citySize) => {
    let array = [];
    let a = regionSize / citySize;
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < a; j++) {
        array.push([i * citySize, j * citySize, citySize]);
      }
    }
    return array.join(", ");
  };

  const code = `cr:${JSON.stringify({
    name: name === "" ? "未命名区域" : name,
    seed: seedValue,
    desert: desert,
    terrain: terrain,
    trees: trees,
    decoration: decoration,
    size: regionSize,
    maps: getMap(regionSize, citySize),
  })}`;
  return (
    <Container className={styles.container}>
      <h1>TheoTown 地图创建工具</h1>
      <Input
        value={name}
        onChange={setNameValue}
        placeholder="请输入区域名称"
        label="区域名称"
      ></Input>
      <div className={styles.seedInputBox}>
        <Input
          value={seedValue}
          onChange={setSeedValue}
          placeholder={"请输入种子"}
          label="种子"
        ></Input>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.seedDice}
          onClick={() => {
            rondomSeed(10);
          }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32 11H28V13H24V15H20V17H18V33H20V31H24V29H28V27H32V11Z"
            fill="#676767"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 11H8V13H12V15H16V17H18V33H16V31H12V29H8V27H4V11Z"
            fill="#C5C5C5"
          />
          <path d="M13 19H9V23H13V19Z" fill="black" />
          <path d="M30 17H26V21H30V17Z" fill="black" />
          <path d="M24 23H20V27H24V23Z" fill="black" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 3H16V5H12V7H8V9H4V11H8V13H12V15H16V17H20V15H24V13H28V11H32V9H28V7H24V5H20V3Z"
            fill="white"
          />
          <path d="M14 9H10V11H14V9Z" fill="black" />
          <path d="M20 9H16V11H20V9Z" fill="black" />
          <path d="M26 9H22V11H26V9Z" fill="black" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 1H16V3H12V5H8V7H4V9H2V27H4V29H8V31H12V33H16V35H20V33H24V31H28V29H32V27H34V9H32V7H28V5H24V3H20V1ZM20 3V5H24V7H28V9H32V27H28V29H24V31H20V33H16V31H12V29H8V27H4V9H8V7H12V5H16V3H20Z"
            fill="black"
          />
        </svg>
      </div>

      <div className={styles.checkBoxs}>
        <CheckBox checked={trees} onChange={setTrees}>
          开启树木
        </CheckBox>
        <CheckBox checked={decoration} onChange={setDecoration}>
          开启装饰
        </CheckBox>
        <CheckBox checked={desert} onChange={setDesert}>
          开启沙漠
        </CheckBox>
        <CheckBox checked={terrain} onChange={setTerrain}>
          开启地形
        </CheckBox>
      </div>

      <Slider
        label="最小城市单元（1 = 64格 * 64格）"
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
        label="区域大小（1 = 64格 * 64格）"
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
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        立即生成
      </Button>

      <Modal
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={
          <>
            <CopyToClipboard text={code}>
              <Button>复制到剪贴板</Button>
            </CopyToClipboard>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
              type="secondary"
            >
              关闭
            </Button>
          </>
        }
        isOpen={modalOpen}
        typed={{
          strings: [code],
          showCursor: true,
          cursorChar: "->",
          typeSpeed: 4,
        }}
        okButtonText="复制到剪贴板4444"
        cancelButtonText="关闭"
        contentClassName={styles.codeModal}
      >
        Hello
      </Modal>
    </Container>
  );
}
