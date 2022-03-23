import { useEffect, useRef, useState } from "react";
import Slider from "../components/slider/slider";
import Button from "../components/button/button";

const Image2pixel = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [pixelPercent, setPixelPercent] = useState(0.2);
  const [imgSrc, setImgSrc] = useState(null);
  const imgRef = useRef(null);

  const changePixel = (value) => {
    toPixel();
    setPixelPercent(value);
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      imgRef.current.onload = () => {
        toPixel();
      };
    }
  };

  const toPixel = () => {
    let canvas = document.getElementById("CANVAS");
    let width = imgRef.current.clientWidth;
    let height = imgRef.current.clientHeight;

    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText =
      "image-rendering: optimizeSpeed;" + // FireFox < 6.0
      "image-rendering: -moz-crisp-edges;" + // FireFox
      "image-rendering: -o-crisp-edges;" + // Opera
      "image-rendering: -webkit-crisp-edges;" + // Chrome
      "image-rendering: crisp-edges;" + // Chrome
      "image-rendering: -webkit-optimize-contrast;" + // Safari
      "image-rendering: pixelated; " + // Future browsers
      "-ms-interpolation-mode: nearest-neighbor;"; // IE

    let context = canvas.getContext("2d");

    // Use nearest-neighbor scaling when images are resized instead of the resizing algorithm to create blur.
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    let percent = pixelPercent;

    // Calculate the scaled dimensions.
    let scaledWidth = width * percent;
    let scaledHeight = height * percent;

    drawImage(
      context,
      imgRef.current,
      canvas,
      scaledWidth,
      scaledHeight,
      width,
      height
    );

    document.body.appendChild(canvas);
  };

  const drawImage = (
    context,
    imageElement,
    canvas,
    scaledWidth,
    scaledHeight,
    width,
    height
  ) => {
    context.drawImage(imageElement, 0, 0, scaledWidth, scaledHeight);
    context.drawImage(
      canvas,
      0,
      0,
      scaledWidth,
      scaledHeight,
      0,
      0,
      width,
      height
    );

    setImgSrc(canvas.toDataURL("image/png"));
  };

  return (
    <div>
      <div>
        <img
          ref={imgRef}
          src={createObjectURL}
          style={{
            width: "400px",
          }}
        />
        <canvas width={400} id="CANVAS"></canvas>
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
      </div>
      {pixelPercent}
      <Slider
        value={pixelPercent}
        min={0}
        max={1}
        step={0.1}
        onChange={changePixel}
      ></Slider>
      <Button href={imgSrc} download={"img"}>
        下载
      </Button>
    </div>
  );
};

export default Image2pixel;
