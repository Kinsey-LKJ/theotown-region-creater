import AMapLoader from "@amap/amap-jsapi-loader";
import Select from "../select/select";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./amap.module.css";

function Amap({previewCanvas,setPreviewCanvas}) {
  const [imgSrc, setImgSrc] = useState(null);
  const mapRef = useRef();
  const [AMAP, setAMAP] = useState(null);
  const [map, setMap] = useState(null);
  const [province, setProvince] = useState(null);
  const [adcode, setAdcode] = useState(null);
  const [provinceData, setProvinceData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [countyData, setCountyData] = useState(null);
  const [currentProvince, setCurrentProvince] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://restapi.amap.com/v3/config/district?keywords=100000&subdistrict=3&key=055f82816293ca4e556985a97adca86d`
      );
      if (response.ok) {
        let json = await response.json();

        setProvinceData(
          json.districts[0].districts.map((item) => {
            item.label = item.name;
            item.value = item.adcode;
            return item;
          })
        );
      } else {
        alert("HTTP-Error: " + response.status);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "f5f0c7954ad742866e7e6d80892e7a19",
    };
    AMapLoader.load({
      key: "644c303dbe63e503adc809a83ea54d76",
      plugins: ["AMap.DistrictLayer"],
    })
      .then((AMap) => {
        setMap(
          new AMap.Map("Map", {
            center: [114.057939, 22.543527],
            zoom: 9,
          })
        );

        // setProvince(
        //   new AMap.DistrictLayer.Province({
        //     zIndex: 12,
        //     // adcode: [130000],
        //     depth: 1,
        //     styles: {
        //       fill: "green",
        //       "province-stroke": "cornflowerblue",
        //       "city-stroke": "white",
        //       "county-stroke": "rgba(255,255,255,0.5)",
        //     },
        //   })
        // );

        setAMAP(AMap);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (map) {
      console.log(map);
      map.setMapStyle("amap://styles/71f0e8e1cac14c502d2a2f5c28ed31bc");
    }
  }, [map]);

  useEffect(() => {
    if (map && province) {
      console.log(province);

      map.add(province);
      map.setFitView();
      console.log(map.getLayers());
    }
  }, [map, province]);

  useEffect(() => {
    if (adcode) {
      if (province) {
        map.remove(province);
      }

      async function fetchData() {
        let response = await fetch(
          `https://restapi.amap.com/v3/config/district?keywords=${adcode}&subdistrict=0&key=055f82816293ca4e556985a97adca86d`
        );
        if (response.ok) {
          let json = await response.json();
          setProvince(
            new AMAP.DistrictLayer.Province({
              zIndex: 12,
              adcode: json.districts[0].adcode,
              depth: 1,
              styles: {
                fill: "transparent",
                "province-stroke": "white",
                "city-stroke":
                  typeof adcode === "string" ? "transparent" : "white",
                // "county-stroke": "rgba(255,255,255,0.5)",
              },
            })
          );

          console.log(json.districts[0].center);
          console.log(json.districts[0].center.split(","));

          map.setCenter(json.districts[0].center.split(","));
        } else {
          alert("HTTP-Error: " + response.status);
        }
      }

      fetchData();
    }
  }, [adcode]);

  const printDocument = (domElement, options) => {
    html2canvas(domElement, options).then((canvas) => {
      canvas.id = "IMG";
      setPreviewCanvas(canvas)
      setImgSrc(canvas.toDataURL("image/png"));
    });
  };

  return (
    <div className={styles.ctn}>
      <div>
        <div ref={mapRef} id="Map" className={styles.map}></div>
      </div>
      <Select
        data={provinceData}
        onChange={(value) => {
          setAdcode(value);
        }}
      ></Select>

      <a
        onClick={() => {
          mapRef.current.classList.add("print");
          map.setZoom(map.getZoom() + 1);
          setTimeout(() => {
            printDocument(mapRef.current, {
              scale: 2,
            });
          }, 1000);
        }}
      >
        预览
      </a>
      <a
        download="img.png"
        href={imgSrc}
        onClick={() => {
          let canvas = document.getElementById("IMG");
          document.body.removeChild(canvas);
        }}
      >
        下载
      </a>

      <button
        onClick={() => {
          setAdcode([440300]);
        }}
      >
        深圳
      </button>
    </div>
  );
}

export default Amap;
