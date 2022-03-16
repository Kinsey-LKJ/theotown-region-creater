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
import Switch from "../components/switch/switch";

export default function Home() {
  // useEffect(() => {
  //   Modal.info({
  //     content: "123",
  //     title: "欢迎！",
  //     typed: {
  //       strings: [
  //         "这是一个可以生成 西奥小镇（ theotown ） 控制台中创建地图的代码的工具，请确保已经打开实验室功能。",
  //       ],
  //       showCursor: true,
  //       cursorChar: "->",
  //       typeSpeed: 4,
  //     },
  //     okButtonText: "我知道了",
  //     // onOk: () => {
  //     //   Modal.info({
  //     //     content: "123",
  //     //     typed: {
  //     //       strings: [
  //     //         "如果你还没有实验室功能，请前往菜单→设置→其它→Debug模式，然后前往菜单→设置→其它→实验性功能，再次进入菜单就可以看到控制台了。",
  //     //       ],
  //     //       showCursor: true,
  //     //       cursorChar: "->",
  //     //       typeSpeed: 4,
  //     //     },
  //     //     okButtonText: "我知道了",
  //     //   });
  //     // },
  //   });
  // }, []);
  const [name, setNameValue] = useState("");
  const [seedValue, setSeedValue] = useState("");
  const [desert, setDesert] = useState(false);
  const [terrain, setTerrain] = useState(false);
  const [trees, setTrees] = useState(false);
  const [decoration, setDecoration] = useState(false);
  const [citySize, setCitySize] = useState(1);
  const [regionSize, setRegionSize] = useState(8);
  const [singleCity, setSingleCity] = useState(false);

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

  let code = `cr:${JSON.stringify({
    name: name === "" ? "未命名区域" : name,
    seed: seedValue,
    desert: desert,
    terrain: terrain,
    trees: trees,
    decoration: decoration,
    size: regionSize,
    maps: "STRING",
  })}`;
  code = code.replace(
    '"maps":"STRING"',
    `"maps":[${getMap(regionSize, !singleCity ? citySize : regionSize)}]`
  );
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto",
        gridGap: "16px",
        justifyItems: "center",
      }}
    >
      <Container className={styles.container}>
        <h1>
          TheoTown <br />
          地图创建工具 <span className={styles.betaSign}>beta</span>
        </h1>
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 11H28V13H24V15H20V17H18V33H20V31H24V29H28V27H32V11Z"
              fill="#676767"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 11H8V13H12V15H16V17H18V33H16V31H12V29H8V27H4V11Z"
              fill="#C5C5C5"
            />
            <path d="M13 19H9V23H13V19Z" fill="black" />
            <path d="M30 17H26V21H30V17Z" fill="black" />
            <path d="M24 23H20V27H24V23Z" fill="black" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 3H16V5H12V7H8V9H4V11H8V13H12V15H16V17H20V15H24V13H28V11H32V9H28V7H24V5H20V3Z"
              fill="white"
            />
            <path d="M14 9H10V11H14V9Z" fill="black" />
            <path d="M20 9H16V11H20V9Z" fill="black" />
            <path d="M26 9H22V11H26V9Z" fill="black" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            width: "100%;",
            justifyContent: "space-between",
            fontSize: "20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "auto auto",
              gridGap: "4px",
            }}
          >
            单一城市{" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                Modal.info({
                  content:
                    <div>当开启单一城市后，一个区域将会只包含一个城市，也就是区域大小等于城市大小，通过此项设置，你可以获得一个非常大的城市，甚至可以超过最大单个城市为 512 * 512 的限制，但游戏会有 bug 产生，目前已知的 bug 有:<br />1、小地图定位不准确。</div>,
                  title: "单一城市",
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <path
                d="M3 12V8H4V6H5V5H6V4H8V3H12V4H14V5H15V6H16V8H17V12H16V14H15V15H14V16H12V17H8V16H6V15H5V14H4V12H3Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 3L11.9999 3V2H7.9999V2.9998H6V3.9998H5V4.9998H4V5.9998H3V7.9998H2V11.9998H3V13.9998H4V14.9998H5V15.9998H6V16.9998H8V15.9998H6V14.9998H5V13.9998H4V11.9998H3V7.9998H4V5.9998H5V4.9998H6V3.9998H8V3ZM17 7.9998V5.9998H16V4.9998H15V3.9998H14V2.9998H12V3.9998H14V4.9998H15V5.9998H16V7.9998H17ZM17 11.9998H18V7.9998H17V11.9998ZM16 13.9998H17V11.9998H16V13.9998ZM15 14.9998V13.9998H16V14.9998H15ZM14 15.9998V14.9998H15V15.9998H14ZM14 15.9998V16.9998H12V15.9998H14ZM11.9999 18H7.9999L7.9999 17H11.9999V18Z"
                fill="black"
              />
              <rect x="9" y="6" width="2" height="2" fill="black" />
              <rect x="9" y="9" width="2" height="5" fill="black" />
            </svg>
          </div>

          <Switch checked={singleCity} onChange={setSingleCity}></Switch>
        </div>

        {!singleCity ? (
          <Slider
            label={
              <div
                style={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "auto auto",
                  gridGap: "4px",
                }}
              >
                单个城市大小
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    Modal.info({
                      content:
                        "表示组成一个区域中城市的大小，1个单位代表游戏中 64格*64格。",
                      title: "最小城市单元",
                    });
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <path
                    d="M3 12V8H4V6H5V5H6V4H8V3H12V4H14V5H15V6H16V8H17V12H16V14H15V15H14V16H12V17H8V16H6V15H5V14H4V12H3Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 3L11.9999 3V2H7.9999V2.9998H6V3.9998H5V4.9998H4V5.9998H3V7.9998H2V11.9998H3V13.9998H4V14.9998H5V15.9998H6V16.9998H8V15.9998H6V14.9998H5V13.9998H4V11.9998H3V7.9998H4V5.9998H5V4.9998H6V3.9998H8V3ZM17 7.9998V5.9998H16V4.9998H15V3.9998H14V2.9998H12V3.9998H14V4.9998H15V5.9998H16V7.9998H17ZM17 11.9998H18V7.9998H17V11.9998ZM16 13.9998H17V11.9998H16V13.9998ZM15 14.9998V13.9998H16V14.9998H15ZM14 15.9998V14.9998H15V15.9998H14ZM14 15.9998V16.9998H12V15.9998H14ZM11.9999 18H7.9999L7.9999 17H11.9999V18Z"
                    fill="black"
                  />
                  <rect x="9" y="6" width="2" height="2" fill="black" />
                  <rect x="9" y="9" width="2" height="5" fill="black" />
                </svg>
              </div>
            }
            value={citySize}
            onChange={changeCitySizeState}
            markes={{
              1: 1,
              2: 2,
              4: 4,
              8: 8,
            }}
          ></Slider>
        ) : (
          ""
        )}

        <Slider
          label={
            <div
              style={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "auto auto",
                gridGap: "4px",
              }}
            >
              区域大小
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  Modal.info({
                    content:
                      "表示一个区域的总大小，1个单位代表游戏中 64格*64格，此项会极大影响游戏的性能，建议不要设置的太高（建议手机用户不要超过32）。",
                    title: "区域大小",
                  });
                }}
              >
                <path
                  d="M3 12V8H4V6H5V5H6V4H8V3H12V4H14V5H15V6H16V8H17V12H16V14H15V15H14V16H12V17H8V16H6V15H5V14H4V12H3Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 3L11.9999 3V2H7.9999V2.9998H6V3.9998H5V4.9998H4V5.9998H3V7.9998H2V11.9998H3V13.9998H4V14.9998H5V15.9998H6V16.9998H8V15.9998H6V14.9998H5V13.9998H4V11.9998H3V7.9998H4V5.9998H5V4.9998H6V3.9998H8V3ZM17 7.9998V5.9998H16V4.9998H15V3.9998H14V2.9998H12V3.9998H14V4.9998H15V5.9998H16V7.9998H17ZM17 11.9998H18V7.9998H17V11.9998ZM16 13.9998H17V11.9998H16V13.9998ZM15 14.9998V13.9998H16V14.9998H15ZM14 15.9998V14.9998H15V15.9998H14ZM14 15.9998V16.9998H12V15.9998H14ZM11.9999 18H7.9999L7.9999 17H11.9999V18Z"
                  fill="black"
                />
                <rect x="9" y="6" width="2" height="2" fill="black" />
                <rect x="9" y="9" width="2" height="5" fill="black" />
              </svg>
            </div>
          }
          value={regionSize}
          onChange={changeRegionSizeState}
          min={8}
          max={32}
          markes={{
            8: 8,
            16: 16,
            24: 24,
            32: 32,
          }}
        ></Slider>
        <Button
          onClick={() => {
            let modal = Modal.confirm({
              title: "预览",
              onOk: () => {
                Modal.confirm({
                  title: "注意事项",
                  content:
                    "在生成代码之前，请确保已打开西奥小镇中的实验室功能，以把代码粘贴到控制台中。最终能否成功生成地图与区域大小、城市大小以及设备的性能有关，如果区域、城市过大可能会导致在生成时游戏闪退、卡死，由此导致的所有问题与本站无关，请自行承担后果，如果您同意自行承担所有后果，请点击“确认生成”，若您不同意，请点击“取消”。",
                  okButtonText: "确认生成",
                  onOk: () => {
                    setModalOpen(true);
                  },
                });
              },
              okButtonText: "下一步",
              content: (
                <div
                  style={{
                    display: "grid",
                    gridGap: "12px",
                  }}
                >
                  {!singleCity ? (
                    <div
                      className={styles.mapPreviewBox}
                      style={{
                        "--no-single-city-city-width": `calc(((100vw - 64px - 24px - 24px ) / ${
                          regionSize / citySize
                        }))`,
                        gridTemplateColumns: `repeat(${
                          regionSize / citySize
                        },var(--no-single-city-city-width)`,
                        gridTemplateRows: `repeat(${
                          regionSize / citySize
                        },var(--no-single-city-city-width)`,
                      }}
                    >
                      {[
                        ...Array(
                          (regionSize / citySize) * (regionSize / citySize)
                        ).keys(),
                      ].map((item) => {
                        return <div key={item}></div>;
                      })}

                      <div className={styles.mapPreviewMapName}>
                        {name ? name : "未命名区域"}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.mapPreviewBox}
                      style={{
                        "--no-single-city-city-width": `calc(100vw - 64px - 24px - 24px )`,
                        gridTemplateColumns: `repeat(${1},var(--no-single-city-city-width)`,
                        gridTemplateRows: `repeat(${1},var(--no-single-city-city-width)`,
                      }}
                    >
                      <div></div>
                      <div className={styles.mapPreviewMapName}>
                        地图名称:{name ? name : "未命名区域"}
                      </div>
                    </div>
                  )}

                  <div>种子:{seedValue}</div>

                  <div>沙漠:{desert ? "开启" : "关闭"}</div>

                  <div>地形:{terrain ? "开启" : "关闭"}</div>

                  <div>树木:{trees ? "开启" : "关闭"}</div>

                  <div>装饰:{decoration ? "开启" : "关闭"}</div>

                  <div>
                    区域总大小:
                    {`${(regionSize / 8) * 512}格 * ${
                      (regionSize / 8) * 512
                    }格`}
                  </div>
                </div>
              ),
            });
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
                <Button onClick={() => {
                  Modal.info({
                    title:'复制成功!',
                    content:`请粘贴到西奥小镇中的控制台中，并点击运行按钮，等待提示“ Region ${name ? name : '未命名区域'} successfully created. You have to restart to see any effect. ” 后即为成功，重启游戏后即可看到您的地图。`
                  })
                  setModalOpen(false);
                }}>复制到剪贴板</Button>
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
      <div>问题反馈: kinsey@lkj.deisgn</div>
    </div>
  );
}
