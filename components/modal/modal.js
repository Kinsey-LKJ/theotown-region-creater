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
const Modal = ({
  isOpen,
  onOk = () => {},
  onCancel = () => {},
  okButtonText = "确定",
  cancelButtonText = "取消",
  children,
  typed,
  contentClassName,
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
  const ty = null;

  useEffect(() => {
    if (typed?.strings && isBrowser) {
      const options = typed;

      ty = new Typed(el.current, options);
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
            <div
              style={{
                overflowY: "scroll",
              }}
            >
              <div ref={el}>{!typed?.strings ? children : ""}</div>
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

          <div className={styles.mask} onClick={() => {
            onCancel()
          }}></div>
        </div>
      </CSSTransition>,
      document.body
    );
  } else {
    return null;
  }
};

["info", "success", "error", "warning", "confirm"].forEach((item) => {
  Modal[item] = ({ ...props }) => {
    let div = document.createElement("div");
    let currentConfig = Object.assign({}, props);
    console.log(currentConfig);
    document.body.appendChild(div);

    const ModalMethod = HOCModal(Modal);
    const destroy = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
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
  return function WarpComponent ({
    onOk = () => {},
    onCancel = () => {},
    text,
    typed,
    contentClassName,
    destroy,
    type,
    animationDuration = 300,
    ...props
  })  {
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
        type={type}
        {...props}
      >{text}</Component>
    );
  };
};

export default Modal;
