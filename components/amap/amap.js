import AMapLoader from "@amap/amap-jsapi-loader";
import Select from "../select/select";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./amap.module.css";
import Container from "../container/container";
import Spin from "../spin/spin";

function Amap({ setPreviewCanvas, amapRef ,setCurrentAdcode}) {
  const [imgSrc, setImgSrc] = useState(null);
  const mapRef = useRef();
  const ctnRef = useRef()
  const [AMAP, setAMAP] = useState(null);
  const [map, setMap] = useState(null);
  const [province, setProvince] = useState(null);
  const [adcode, setAdcode] = useState(null);
  const [level, setLevel] = useState(null);
  const [provinceData, setProvinceData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentDistrict, setCurrentDistrictCity] = useState(null);
  const [provinceObjectData, setProvinceObjectData] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);

  useImperativeHandle(amapRef, () => {
    return privewMap;
  });


  useEffect(() => {
    ctnRef.current.style.cssText += `
      --private-map-ctn-height:${ctnRef.current.offsetWidth}px;
    `
  },[])

  useEffect(() => {
    if (currentProvince) {
      console.log(currentProvince);
      setCityData(provinceObjectData[currentProvince].districts);

      if (currentCity) {
        setDistrictData(null);
      }
    }
  }, [currentProvince]);

  useEffect(() => {
    if (currentCity) {
      setDistrictData(
        provinceObjectData[currentProvince].districtsObject[currentCity]
          .districts
      );
    }
  }, [currentCity]);

  useEffect(() => {
    console.log(level);
  }, [level]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://restapi.amap.com/v3/config/district?keywords=100000&subdistrict=3&key=055f82816293ca4e556985a97adca86d`
      );
      if (response.ok) {
        let json = await response.json();
        console.log(
          json.districts[0].districts.map((item) => {
            item.label = item.name;
            item.value = item.adcode;
            return item;
          })
        );

        let data = json.districts[0].districts.map((province, i) => {
          province.label = province.name;
          province.value = province.adcode;
          province.districts.push({
            name: "不选择",
            adcode: province.adcode,
            level: "province",
            districts: [],
          });
          province.districts.map((city, j) => {
            city.label = city.name;
            city.value = city.adcode;
            city.districts.push({
              name: "不选择",
              adcode: city.adcode,
              level: "city",
              districts: [],
            });
            city.districts.map((district) => {
              district.label = district.name;
              district.value = district.adcode;
            });
          });

          return province;
        });
        setProvinceData(data);

        let obj = {};

        data.forEach((item) => {
          obj[item.adcode] = item;
          obj[item.adcode].districtsObject = {};
          item.districts.forEach((city) => {
            // obj[item.adcode].districtsObject[city.adcode] = city;
            obj[item.adcode].districtsObject[city.adcode] = city;
            obj[item.adcode].districtsObject[city.adcode].districtsObject = {};
            city.districts.forEach((district) => {
              obj[item.adcode].districtsObject[city.adcode].districtsObject[
                district.adcode
              ] = district;
            });
          });
        });
        console.log(obj);
        setProvinceObjectData(obj);
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
            zoom: 6,
          })
        );

        setMapLoading(false);

        // setProvince(
        //   new AMap.DistrictLayer.Province({
        //     zIndex: 12,
        //     // adcode: [130000],
        //     depth: 1,
        //     styles: {
        //       fill: "green",
        //       "province-stroke": "cornflowerblue",
        //       "city-stroke": "white",
        //       "district-stroke": "rgba(255,255,255,0.5)",
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

      console.log(adcode);

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
              depth: 2,
              styles: {
                fill: "transparent",
                "province-stroke": "white",
                "city-stroke":
                  level === "province" || level === "district"
                    ? "transparent"
                    : "white",
                "county-stroke": level === "district" ? "white" : "transparent",
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

  const printDocument = (domElement, options, callBack) => {
    html2canvas(domElement, options).then((canvas) => {
      canvas.id = "IMG";
      setPreviewCanvas(canvas);
      // setImgSrc(canvas.toDataURL("image/png"));
      mapRef.current.classList.remove("print");
      callBack(canvas);
    });
  };

  const privewMap = (callBack) => {
    mapRef.current.classList.add("print");
    map.setZoom(map.getZoom() + 1);
    setTimeout(() => {
      printDocument(
        mapRef.current,
        {
          scale: 2,
        },
        callBack
      );
    }, 1000);
  };

  return (
    <div className={styles.ctn} ref={ctnRef}>
      <Container
        pixelTheme="inline-box"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "var(--private-map-ctn-height)",
          width: "100%",
        }}
      >
        <div className={styles.mapBox}>
          {mapLoading ? <Spin className={styles.mapSpin}></Spin> : ""}

          <div ref={mapRef} id="Map" className={styles.map}></div>
        </div>
      </Container>

      <div>可根据自己的需要手动缩放调整当前选择行政区的位置</div>

      <Select
        data={provinceData}
        onChange={(value) => {
          setAdcode(value);
          setCurrentProvince(value);
          setLevel(provinceObjectData[value].level);
          setCurrentAdcode(value)
        }}
        placeholder="请选择省级行政单位"
      ></Select>

      <Select
        data={cityData}
        onChange={(value) => {
          setAdcode(value);
          setCurrentCity(value);
          setLevel(
            provinceObjectData[currentProvince].districtsObject[value].level
          );
          setCurrentAdcode(value)
        }}
        placeholder="请选择市级行政单位"
      ></Select>

      <Select
        data={districtData}
        onChange={(value) => {
          setAdcode(value);
          setCurrentDistrictCity(value);
          setLevel(
            provinceObjectData[currentProvince].districtsObject[currentCity]
              .districtsObject[value].level
          );
          setCurrentAdcode(value)
        }}
        placeholder="请选择区/县级行政单位"
      ></Select>
    </div>
  );
}

export default Amap;
