import ReactDOM from "react-dom";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Button from "../components/button/button";
import CheckBox from "../components/checkbox/checkbox";
import Container from "../components/container/container";
import Select from "../components/select/select";
import Input from "../components/input/input";
import Modal from "../components/modal/modal";
import Slider from "../components/slider/slider";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "../styles/Home.module.css";
import Switch from "../components/switch/switch";
import dynamic from "next/dynamic";

const Amap = dynamic(() => import("../components/amap/amap"), { ssr: false });

const DonateModalContent = () => {
  return (
    <div>
      为爱发电需要持续承担服务器、域名等费用，如果此工具对你有帮助，可以请我喝杯咖啡，感谢！
      <div
        style={{
          margin: "16px 0",
        }}
      >
        <Image
          src={"/wechat-donate.jpg"}
          alt="微信支付"
          width={828}
          height={1124}
          style={{ display: "block", width: "100%" }}
        />
        <Image
          src={"/alipay-donate.jpg"}
          alt="支付宝"
          width={1780}
          height={2560}
          style={{ display: "block", width: "100%" }}
        />
      </div>
      <div
        style={{
          color: "#fe4e4e",
          marginBottom: 16,
        }}
      >
        未成年人请勿打赏，请勿进行大额打赏。
      </div>
    </div>
  );
};

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
  const [snow, setSnow] = useState(false);
  const [terrain, setTerrain] = useState(false);
  const [trees, setTrees] = useState(false);
  const [decoration, setDecoration] = useState(false);
  const [citySize, setCitySize] = useState(4);
  const [regionSize, setRegionSize] = useState(12);
  const [singleCity, setSingleCity] = useState(false);
  const [previewCanvas, setPreviewCanvas] = useState(null);
  const [realMap, setRealMap] = useState(null);
  const [currentAdcode, setCurrentAdcode] = useState("theo-image");
  const [platform, setPlatform] = useState(null);

  const amapRef = useRef(); //通过ref调用子组件的方法

  useEffect(() => {
    if (!localStorage.getItem("update1_2")) {
      const log = Modal.confirm({
        title: "更新日志 1.2",
        content: (
          <div>
            2025-02-16
            <br />
            1、增加了 Steam 平台的地图导入指引。
            <br />
            2、优化了地图导入指引的整体逻辑。
            <br />
            3、修改部份文案，使其更符合直觉。
            <br />
            4、修复了 Switch 组件的样式偏移问题。
          </div>
        ),
        okButtonText: "我知道了",
        cancelButtonText: "不再提示",
        onCancel: () => {
          localStorage.setItem("update1_2", true);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (realMap) {
      setTerrain(false);
    }
  }, [realMap]);

  const changeCitySizeState = (value) => {
    if (value === 1) {
      Modal.info({
        title: "温馨提示",
        content:
          "你正在将单个城市大小调整为最小值，最终的地图可能会生成非常非常多的小城市，你可以点击“立即生成“来进行预览，这会极大的增加性能的消耗，并且创建失败的概率非常大，请知悉。",
      });
    }

    if (regionSize <= 8) {
      setRegionSize(value);
    } else {
      setRegionSize(parseInt(regionSize / value) * value);
    }

    setCitySize(value);
  };
  const [modalOpen, setModalOpen] = useState(false);

  const changeRegionSizeState = (value) => {
    if (!singleCity) {
      if (value % citySize === 0) {
        setRegionSize(value);
      }
    } else {
      if (value % 2 === 0) {
        setRegionSize(value);
      }
    }
  };

  const changeSingleCity = (value) => {
    if (value) {
      if (regionSize < 8) {
        setRegionSize(8);
      } else {
        setRegionSize(Math.ceil(regionSize / 2) * 2);
      }
    } else {
      setRegionSize(Math.ceil(regionSize / citySize) * citySize);
    }
    setSingleCity(value);
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

  const getRegionMarkes = (citySize) => {
    let obj = {};

    for (let i = 1; i <= parseInt(32 / citySize); i++) {
      obj[i * citySize] = i * citySize;
    }

    return obj;
  };

  const previewModal = (canvas, href) => {
    let modal = Modal.confirm({
      title: "预览",
      // onOk: () => {
      //   Modal.confirm({
      //     title: "注意事项",
      //     content:
      //       "在生成代码之前，请确保已打开西奥小镇中的实验室功能，以把代码粘贴到控制台中。最终能否成功生成地图与区域大小、城市大小以及设备的性能有关，如果区域、城市过大可能会导致在生成时游戏闪退、卡死，由此导致的所有问题与本站无关，请自行承担后果，如果你同意自行承担所有后果，请点击“确认生成”，若你不同意，请点击“取消”。",
      //     okButtonText: "确认生成",
      //     onOk: () => {
      //       setModalOpen(true);
      //     },
      //   });
      // },
      footer: (
        <>
          {realMap ? (
            <Button
              download={`${currentAdcode}.png`}
              href={href}
              onClick={() => {
                // canvas.toBlob((blob) => {
                //   saveAs(blob, `${currentAdcode}.png`);
                // });
                modal.destroy();
                let moadl2 = Modal.confirm({
                  title: "下载地图",
                  contentClassName: styles.largeModal,
                  content: (
                    <div style={{ wordBreak: "break-word" }}>
                      已开始下载地图（如果下载失败，请
                      <a
                        onClick={() => {
                          Modal.info({
                            title: "手动下载地图提示",
                            content: (
                              <>
                                请长按以下图片进行手动保存，
                                <span className={styles.mainText}>
                                  并一定要把文件命名为
                                  {currentAdcode}
                                  ，格式为png（小写），并放入指定文件夹中。
                                </span>
                                <br />
                                <img
                                  style={{ width: "100%" }}
                                  src={canvas.toDataURL()}
                                />
                              </>
                            ),
                            okButtonText: "继续",
                          });
                        }}
                        className={styles.mainText}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        点击手动下载
                      </a>
                      ）。
                      {platform !== "Steam" ? (
                        <>
                          <br />
                          请将下载好的地图放入以下目录，并保证文件名为
                          {currentAdcode}.png
                          <br />
                          <br />
                        </>
                      ) : (
                        <>
                          <br />
                          下载完成后，请点击“下一步”
                        </>
                      )}
                      {platform === "iOS"
                        ? "地址为：文件App/我的iPhone/TheoTown/pictures"
                        : platform === "Android"
                        ? "地址为：Android/data/info.flowersoft.theotown.theotown/files/pictures"
                        : ""}
                      <br />
                      <br />
                      {platform !== "Steam"
                        ? "如果在对应的目录没有找到 pictures 文件夹，请手动新建。"
                        : ""}
                    </div>
                  ),
                  footer: (
                    <>
                      {platform !== "Steam" ? (
                        <>
                          {" "}
                          <Button
                            onClick={() => {
                              setModalOpen(true);
                              moadl2.destroy();
                            }}
                          >
                            下一步：从控制台导入地图
                          </Button>
                          <div style={{textAlign: "center"}}>或</div>
                        </>
                      ) : null}

                      <Button
                        onClick={() => {
                          moadl2.destroy();
                          const modal3 = Modal.confirm({
                            title: "导入地图到游戏中",
                            contentClassName: styles.largeModal,
                            content: (
                              <>
                                请按照以下步骤将下载好的地图导入到游戏中：
                                <br />
                                <br />
                                <span className={styles.mainText}>
                                  在游戏中点击“创建区域”-{">"}
                                  点击“文件夹”按钮-{">"}选择刚刚下载的图片-{">"}
                                  点击地形-{">"}关闭山坡地形即可
                                </span>
                                <br />
                                <br />
                                请务必关闭山坡地形，因为会导致导入的地图高度异常。
                                <br />
                                <br />
                                请注意，除了所选择的真实地图数据以外，你刚刚所设置
                                <span className={styles.mainText}>
                                  地图尺寸及地图的装饰、树木等配置将失效，建议在游戏自带工具中自行进行更丰富的调整。
                                </span>
                              </>
                            ),
                            okButtonText: "我知道了",
                            cancelButtonText: "我想通过控制台导入地图",
                            footer: (
                              <>
                                <Button
                                  onClick={() => {
                                    modal3.destroy();
                                  }}
                                  type="secondary"
                                >
                                  我知道了
                                </Button>

                                {/* {platform !== "Steam" ? (
                                  <Button
                                    onClick={() => {
                                      setModalOpen(true);
                                      modal3.destroy();
                                    }}
                                    type="secondary"
                                  >
                                    我想通过控制台导入地图
                                  </Button>
                                ) : null} */}

                                <Button
                                  onClick={() => {
                                    modal3.destroy();
                                    Modal.info({
                                      title: "开发不易，打赏随意",
                                      contentClassName: styles.largeModal,
                                      okButtonText: "我知道了",
                                      content: <DonateModalContent />,
                                    });
                                  }}
                                >
                                  捐赠
                                </Button>
                              </>
                            ),
                          });
                        }}
                      >
                        {platform === "Steam"
                          ? "下一步"
                          : "下一步：从游戏自带工具导入地图"}
                      </Button>
                      <Button
                        onClick={() => {
                          moadl2.destroy();
                        }}
                        type="secondary"
                      >
                        取消
                      </Button>
                    </>
                  ),
                });
              }}
            >
              下一步：下载图片
            </Button>
          ) : (
            <Button
              onClick={() => {
                modal.destroy();
                setModalOpen(true);
              }}
            >
              下一步
            </Button>
          )}

          <Button
            onClick={() => {
              modal.destroy();
            }}
            type="secondary"
          >
            取消
          </Button>
        </>
      ),
      contentClassName: styles.largeModal,
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
                gridTemplateColumns: `repeat(${citys}, 1fr)`,
                gridTemplateRows: `repeat(${citys}, 1fr)`,
              }}
            >
              {[...Array(citys * citys).keys()].map((item) => {
                return <div key={item}></div>;
              })}

              <div className={styles.mapPreviewMapName}>
                {name ? name : "未命名区域"}
              </div>

              {realMap ? <img src={canvas.toDataURL()} /> : ""}
            </div>
          ) : (
            <div
              className={styles.mapPreviewBox}
              style={{
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr",
              }}
            >
              <div></div>
              <div className={styles.mapPreviewMapName}>
                {name ? name : "未命名区域"}
              </div>
              {realMap ? <img src={canvas.toDataURL()} /> : ""}
            </div>
          )}

          <div>
            单个城市大小:
            {!singleCity
              ? `${(citySize / 8) * 512}格 * ${(citySize / 8) * 512}格`
              : `${(regionSize / 8) * 512}格 * ${(regionSize / 8) * 512}格`}
          </div>

          <div>
            区域总大小:
            {`${(regionSize / 8) * 512}格 * ${(regionSize / 8) * 512}格`}
          </div>

          <div>种子:{seedValue}</div>

          <div>沙漠:{desert ? "开启" : "关闭"}</div>

          <div>雪地:{snow ? "开启" : "关闭"}</div>

          <div>地形:{terrain ? "开启" : "关闭"}</div>

          <div>树木:{trees ? "开启" : "关闭"}</div>

          <div>装饰:{decoration ? "开启" : "关闭"}</div>
        </div>
      ),
    });
  };

  let code = `cr:${JSON.stringify({
    name: name === "" ? "未命名区域" : name,
    bmp: realMap ? `/pictures/${currentAdcode}.png` : "NULL",
    seed: realMap ? "NULL" : seedValue,
    desert: desert,
    snow: snow,
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

  if (realMap) {
    code = code.replace('"seed":"NULL",', "");
  } else {
    code = code.replace('"bmp":"NULL",', "");
  }

  let citys = regionSize / citySize;

  let regionMarkes = getRegionMarkes(citySize);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto",
        gridGap: "16px",
        justifyItems: "center",
      }}
    >
      <Head>
        <title>西奥小镇地图创建工具</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container className={styles.container}>
        <h1>
          TheoTown <br />
          地图创建工具 <span className={styles.betaSign}>1.2</span>
        </h1>
        <Input
          value={name}
          onChange={setNameValue}
          placeholder="请输入区域名称"
          label="区域名称"
        ></Input>

        <div
          style={{
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "auto auto",
            gridGap: "4px",
            fontSize: "20px",
            width: "100%",
            justifyContent: "space-between",
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
            创建真实地图{" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                Modal.info({
                  content: (
                    <div>
                      当开启创建真实地图时，你可以选择任意一个行政区来创建地图。
                    </div>
                  ),
                  title: "真实地图说明",
                  okButtonText: "我知道了",
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
          <Switch checked={realMap} onChange={setRealMap}></Switch>
        </div>
        {realMap ? (
          <Amap
            previewCanvas={previewCanvas}
            setPreviewCanvas={setPreviewCanvas}
            amapRef={amapRef}
            setCurrentAdcode={setCurrentAdcode}
          ></Amap>
        ) : (
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
        )}

        <div className={styles.checkBoxs}>
          <CheckBox checked={trees} onChange={setTrees}>
            开启树木
          </CheckBox>
          <CheckBox checked={snow} onChange={setSnow}>
            开启雪地
          </CheckBox>
          <CheckBox checked={decoration} onChange={setDecoration}>
            开启装饰
          </CheckBox>
          <CheckBox checked={desert} onChange={setDesert}>
            开启沙漠
          </CheckBox>

          {!realMap ? (
            <CheckBox checked={terrain} onChange={setTerrain}>
              开启地形
            </CheckBox>
          ) : (
            ""
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            width: "100%;",
            justifyContent: "space-between",
            fontSize: "20px",
            alignItems: "center",
            zIndex: 9,
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
                  content: (
                    <div>
                      当开启单一城市后，一个区域将会只包含一个城市，也就是区域大小等于城市大小，通过此项设置，你可以获得一个非常大的城市，甚至可以超过最大单个城市为
                      512 * 512 的限制。
                    </div>
                  ),
                  title: "单一城市",
                  okButtonText: "我知道了",
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

          <Switch checked={singleCity} onChange={changeSingleCity}></Switch>
        </div>

        {!singleCity ? (
          <>
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
                        okButtonText: "我知道了",
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
              min={4}
              max={8}
              markes={{
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
              }}
            ></Slider>

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
                          "表示一个区域的总大小，1个单位代表游戏中 64格*64格，此项会极大影响游戏的性能，建议不要设置的太高（建议手机用户不要超过16，如果手机配置较高可以适当调整的大一点）。",
                        title: "区域大小",
                        okButtonText: "我知道了",
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
              min={citySize}
              max={regionMarkes[parseInt(32 / citySize) * citySize]}
              markes={regionMarkes}
            ></Slider>
          </>
        ) : (
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
                        "表示一个区域的总大小，1个单位代表游戏中 64格*64格，此项会极大影响游戏的性能，建议不要设置的太高（建议手机用户不要超过20,对自己设备性能有信心的可以调的大一点）。",
                      title: "区域大小",
                      okButtonText: "我知道了",
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
              10: 10,
              12: 12,
              14: 14,
              16: 16,
              18: 18,
              20: 20,
              22: 22,
              24: 24,
              26: 26,
              28: 28,
              30: 30,
              32: 32,
            }}
          ></Slider>
        )}

        {realMap ? (
          <Select
            data={[
              { label: "iOS", value: "iOS" },
              { label: "Android", value: "Android" },
              { label: "Steam", value: "Steam" },
            ]}
            onChange={(value) => {
              setPlatform(value);
            }}
            placeholder="请选择游戏平台"
          ></Select>
        ) : (
          ""
        )}

        <Button
          onClick={() => {
            if (!platform && realMap) {
              Modal.warning({
                content: "请先选择游戏平台",
              });
              return;
            }
            if (realMap) {
              let moadl = Modal.spin({
                content: "正在生成地图...",
                maskClassName: styles.spinModal,
              });
              amapRef.current((canvas, blob) => {
                moadl.destroy();
                previewModal(canvas, blob);
              });
            } else {
              previewModal();
            }
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
              {/* {realMap ? (
                <Button
                  onClick={() => {
                    let moadl = Modal.info({
                      title: "导入图片说明",
                      content:
                        "要使用图片创建地图，需要将已下载好的地图放入西奥小镇游戏的根目录的 picture 文件夹中，请不要修改文件名称。",
                      footer: (
                        <CopyToClipboard text={code}>
                          <Button
                            onClick={() => {
                              moadl.destroy();
                              Modal.info({
                                title: "复制成功!",
                                content: `请粘贴到西奥小镇中的控制台中，并点击运行按钮，等待提示“ Region ${
                                  name ? name : "未命名区域"
                                } successfully created. You have to restart to see any effect. ” 后即为成功，重启游戏后即可看到你的地图。如果在执行代码时出现闪退，有极大概率创建地图出错了，请将区域大小调小或将城市大小调大，然后重新尝试一下。`,
                              });
                              setModalOpen(false);
                            }}
                          >
                            下一步：复制代码到剪贴板
                          </Button>
                        </CopyToClipboard>
                      ),
                    });
                  }}
                >
                  下一步：下载地图
                </Button>
              ) : (
                ""
              )} */}
              <CopyToClipboard text={code}>
                <Button
                  onClick={() => {
                    const moadl = Modal.confirm({
                      title: "复制成功!",
                      content: `请粘贴到西奥小镇中的控制台中，并点击运行按钮，等待提示“ Region ${
                        name ? name : "未命名区域"
                      } successfully created. You have to restart to see any effect. ” 后即为成功，重启游戏后即可看到你的地图。如果在执行代码时出现闪退，有极大概率创建地图出错了，请将区域大小调小或将城市大小调大，然后重新尝试一下。`,
                      footer: (
                        <>
                          <Button
                            type="secondary"
                            onClick={() => {
                              moadl.destroy();
                              setModalOpen(false);
                            }}
                          >
                            我知道了
                          </Button>
                          <Button
                            onClick={() => {
                              moadl.destroy();
                              setModalOpen(false);
                              Modal.info({
                                title: "开发不易，打赏随意",
                                contentClassName: styles.largeModal,
                                okButtonText: "我知道了",
                                content: <DonateModalContent />,
                              });
                            }}
                          >
                            捐赠
                          </Button>
                        </>
                      ),
                    });
                  }}
                >
                  复制代码到剪贴板
                </Button>
              </CopyToClipboard>

              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                type="secondary"
              >
                取消
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
        <Button
          type="secondary"
          onClick={() => {
            Modal.info({
              title: "开发不易，打赏随意",
              contentClassName: styles.largeModal,
              okButtonText: "我知道了",
              content: <DonateModalContent />,
            });
          }}
        >
          捐赠
        </Button>
      </Container>

      <div>问题反馈: <a href="https://github.com/kinseyjs/theotown-region-creater/issues" target="_blank" rel="noreferrer">GitHub Issues</a></div>
    </div>
  );
}
