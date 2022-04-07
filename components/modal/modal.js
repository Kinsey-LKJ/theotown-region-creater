import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Typed from "typed.js";
import Button from "../button/button";
import styles from "./modal.module.css";
import Container from "../container/container";
import Spin from "../spin/spin";
const Modal = ({
  title,
  isOpen,
  onOk = () => {},
  onCancel = () => {},
  okButtonText = "确定",
  cancelButtonText = "取消",
  children,
  typed,
  contentClassName,
  maskClassName,
  type,
  animationDuration = 300,
  footer,
}) => {
  //   if (!isOpen) {
  //     return null;
  //   }

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const el = useRef(null);
  const ty = useRef(null);

  useEffect(() => {
    if (typed?.strings && isBrowser) {
      const options = typed;

      ty.current = new Typed(el.current, options);
    }
    if (isBrowser && isOpen) {
      document.body.classList.add("modal-open");
    }else if(isBrowser && !isOpen) {
      document.body.classList.remove("modal-open");
    }
    // return () => {
    //   typedRef.destroy();
    // };
  }, [isOpen]);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEsccapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEsccapeKeyDown);
    };
  }, []);

  const closeOnEsccapeKeyDown = (e) => {
    if (e.charCode || e.keyCode === 27) {
      onOk();
    }
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <>
        {type === "spin" ? (
          <div className={`${styles.ctn}`}>
            <div className={`${styles.content}  ${styles.spinMoal} ${contentClassName}`}>
              <Spin />
              {children}
            </div>

            <div className={`${styles.mask} ${maskClassName}`}></div>
          </div>
        ) : (
          <CSSTransition
            in={isOpen}
            classNames="modal-fade"
            timeout={animationDuration}
            unmountOnExit
          >
            <div
              className={`${styles.ctn}`}
              style={{
                "--modal-content-offset-x": "0px",
                "--modal-content-offset-y": "-100px",
              }}
            >
              <Container
                className={`${styles.content} modal-content ${contentClassName}`}
              >
                {title ? <div className={styles.title}>{title}</div> : ""}
                <div
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "100%",
                  }}
                >
                  <div>
                    <div ref={el}>{!typed?.strings ? children : ""}</div>
                  </div>
                </div>

                <div className={styles.footer}>
                  {footer ? (
                    footer
                  ) : type === "info" ||
                    type === "success" ||
                    type === "error" ||
                    type === "warning" ? (
                    <Button
                      onClick={() => {
                        onOk();
                      }}
                    >
                      {okButtonText}
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          onOk();
                        }}
                      >
                        {okButtonText}
                      </Button>
                      <Button
                        onClick={() => {
                          onCancel();
                        }}
                        type="secondary"
                      >
                        {cancelButtonText}
                      </Button>
                    </>
                  )}
                </div>
              </Container>

              <div
                className={`${styles.mask} ${maskClassName}`}
                onClick={() => {
                  onCancel();
                }}
              ></div>
            </div>
          </CSSTransition>
        )}
      </>,
      document.body
    );
  } else {
    return null;
  }
};

["info", "success", "error", "warning", "confirm","spin"].forEach((item) => {
  Modal[item] = ({ ...props }) => {
    let div = document.createElement("div");
    let currentConfig = Object.assign({}, props);
    document.body.appendChild(div);

    const ModalMethod = HOCModal(Modal);
    const destroy = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
      document.body.classList.remove("modal-open");
    };

    const render = (config) => {
      ReactDOM.render(
        <ModalMethod destroy={destroy} {...config} type={item} />,
        div
      );
    };

    render(currentConfig);
    return {
      destroy: destroy,
    };
  };
});
// Modal.confirm = ({ ...props }) => {
//   let div = document.createElement("div");
//   let currentConfig = Object.assign({}, props);
//   console.log(currentConfig);
//   document.body.appendChild(div);

//   const ModalMethod = HOCModal(Modal);
//   const destroy = () => {
//     const unmountResult = ReactDOM.unmountComponentAtNode(div);
//     if (unmountResult && div.parentNode) {
//       div.parentNode.removeChild(div);
//     }
//   };

//   const render = (config) => {
//     ReactDOM.render(<ModalMethod destroy={destroy} {...config} />, div);
//   };

//   render(currentConfig);
//   return Modal.confirm;
// };

const HOCModal = (Component) => {
  return function WarpComponent({
    onOk = () => {},
    onCancel = () => {},
    content,
    typed,
    contentClassName,
    maskClassName,
    destroy,
    type,
    animationDuration = 300,
    ...props
  }) {
    const [modalMethodIsOpen, setModalMethodIsOpen] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setModalMethodIsOpen(true);
      }, 1);
    }, []);

    const onOk2 = () => {
      setModalMethodIsOpen(false);
      onOk();
      setTimeout(() => {
        destroy();
      }, animationDuration);
    };
    const onCancel2 = () => {
      setModalMethodIsOpen(false);
      onCancel();
      setTimeout(() => {
        destroy();
      }, animationDuration);
    };

    return (
      <Component
        isOpen={modalMethodIsOpen}
        onOk={onOk2}
        onCancel={onCancel2}
        typed={typed}
        contentClassName={contentClassName}
        maskClassName={maskClassName}
        type={type}
        {...props}
      >
        {content}
      </Component>
    );
  };
};

export default Modal;
