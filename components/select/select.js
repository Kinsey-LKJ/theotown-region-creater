import { useState, useEffect, useRef } from "react";
import styles from "./select.module.css";

const Select = ({data, defaultValue = null ,placeholder="请选择",onChange=() => {}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_value, set_Value] = useState(defaultValue);
  const selectRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", clickCallBack, false);
      return function cleanup() {
        document.body.removeEventListener("click", clickCallBack, false);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if(_value) {
      onChange(_value)
    }
  },[_value])

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

  const getLabel = (_value) => {
    if(data?.length >= 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === _value) {
          return data[i].label;
        } 
      }
    } else {
      return undefined
    }
  };

  return (
    <div className={`${styles.ctn} box`} ref={selectRef}>
      <div className={styles.body} onClick={toggleOpen}>
        <div className="pixel-decorate">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>

        {_value ? getLabel(_value) ?  getLabel(_value) : placeholder : placeholder}

        <svg
          version="1.1"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
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
        <div className={`${styles.dropDown} box`}>
          <div className="pixel-decorate">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className={styles.dropDownItems}>
            {data?.map((item) => {
              return (
                <div
                  key={item.value}
                  onClick={() => {
                    set_Value(item.value);
                    setIsOpen(false);
                  }}
                  className={`${styles.dropDownItem} ${
                    item.value === _value ? styles.checked : ""
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
