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
  onClose = () => {},
  children,
  typed,
  contentClassName,
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
      onClose();
    }
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <CSSTransition
        in={isOpen}
        classNames="modal-fade"
        timeout={300}
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
            <div>
              <div ref={el}>{!typed?.strings ? children : ""}</div>
            </div>

            <div>
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                知道了
              </Button>
            </div>
          </Container>

          <div className={styles.mask} onClick={onClose}></div>
        </div>
      </CSSTransition>,
      document.body
    );
  } else {
    return null;
  }
};
 Modal.confirm = ({ ...props }) => {
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
    ReactDOM.render(<ModalMethod destroy={destroy} {...config} />, div);
  };

  render(currentConfig);
  return Modal.confirm;
};

const HOCModal = (Component) => {
  return ({ onClose = () => {}, text, typed, contentClassName, destroy }) => {
    const [modalMethodIsOpen, setModalMethodIsOpen] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setModalMethodIsOpen(true)
      },1)
    }, []);

    const onClose2 = () => {
      onClose();
      destroy();
    };

    return (
      <Component
        isOpen={modalMethodIsOpen}
        onClose={onClose2}
        children={text}
        typed={typed}
        contentClassName={contentClassName}
      ></Component>
    );
  };
};

export default Modal;
