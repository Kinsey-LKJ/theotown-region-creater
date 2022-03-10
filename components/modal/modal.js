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
const Modal = ({ isOpen, onClose, children, typed }, ref) => {
  //   if (!isOpen) {
  //     return null;
  //   }

  const closeOnEsccapeKeyDown = (e) => {
    if (e.charCode || e.keyCode === 27) {
      onClose();
    }
  };


  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const el = useRef(null);
  const ty = null

  useEffect(() => {
    if (typed.strings && isBrowser) {

      const options = typed

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
          <Container className={`${styles.content} modal-content`}>

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


export default Modal
