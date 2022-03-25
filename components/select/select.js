import { useState, useEffect, useRef } from "react";
import styles from "./select.module.css";
let data = [
  {
    value: "qingcai",
    label: "青菜",
  },
  {
    value: "luobo",
    label: "萝卜",
  },
  {
    value: "tudou",
    label: "土豆",
  },
  {
    value: "xiangjaio",
    label: "香蕉",
  },
];
const Select = ({ defaultValue = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const selectRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", clickCallBack, false);
      return function cleanup() {
        document.body.removeEventListener("click", clickCallBack, false);
      };
    }
  }, [isOpen]);

  const toggleOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const clickCallBack = (e) => {
    if (selectRef.current.contains(e.target)) {
      return;
    }
    console.log(1);
    setIsOpen(false);
  };

  const getLabel = (value) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === value) {
        return data[i].label;
      }
    }
  };

  return (
    <div className={styles.ctn} ref={selectRef}>
      <div className={styles.body} onClick={toggleOpen}>
        <div>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>

        {value ? getLabel(value) : "请选择XXX"}

        <svg
          version="1.1"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="crispEdges"
          fill="currentColor"
        >
          <rect x="3" y="5" width="1" height="1" />
          <rect x="4" y="5" width="1" height="1" />
          <rect x="11" y="5" width="1" height="1" />
          <rect x="12" y="5" width="1" height="1" />
          <rect x="3" y="6" width="1" height="1" />
          <rect x="4" y="6" width="1" height="1" />
          <rect x="5" y="6" width="1" height="1" />
          <rect x="10" y="6" width="1" height="1" />
          <rect x="11" y="6" width="1" height="1" />
          <rect x="12" y="6" width="1" height="1" />
          <rect x="4" y="7" width="1" height="1" />
          <rect x="5" y="7" width="1" height="1" />
          <rect x="6" y="7" width="1" height="1" />
          <rect x="9" y="7" width="1" height="1" />
          <rect x="10" y="7" width="1" height="1" />
          <rect x="11" y="7" width="1" height="1" />
          <rect x="5" y="8" width="1" height="1" />
          <rect x="6" y="8" width="1" height="1" />
          <rect x="7" y="8" width="1" height="1" />
          <rect x="8" y="8" width="1" height="1" />
          <rect x="9" y="8" width="1" height="1" />
          <rect x="10" y="8" width="1" height="1" />
          <rect x="6" y="9" width="1" height="1" />
          <rect x="7" y="9" width="1" height="1" />
          <rect x="8" y="9" width="1" height="1" />
          <rect x="9" y="9" width="1" height="1" />
          <rect x="7" y="10" width="1" height="1" />
          <rect x="8" y="10" width="1" height="1" />
        </svg>
      </div>

      {isOpen ? (
        <div className={styles.dropDown}>
          <div>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className={styles.dropDownItems}>
            {data.map((item) => {
              return (
                <div
                  onClick={() => {
                    setValue(item.value);
                    setIsOpen(false);
                  }}
                  className={`${styles.dropDownItem} ${
                    item.value === value ? styles.checked : ""
                  }`}
                >
                  {item.label}

                  <img src="./handle.svg" alt="" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Select;
