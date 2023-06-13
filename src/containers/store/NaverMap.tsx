import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Marker from "@/asset/Marker.png";

interface IsNaverMap {}

const storeList = [
  {
    storeName: "Kasina",
    list: [
      {
        name: "카시나 1997",
        position: { latitude: 37.5255318203934, longitude: 127.034500804915 },
      },
      {
        name: "카시나 한남점",
        position: { latitude: 37.5382046529897, longitude: 127.001811148736 },
      },
    ],
  },
  {
    storeName: "Hights",
    list: [],
  },
];

export const NaverMap = ({}: IsNaverMap) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 37.4862618, longitude: 127.1222903 });

  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     setCurrentLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //   });
    // }

    // if (mapRef.current) return;
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      ),
      zoomControl: true,
      zoom: 15,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    new naver.maps.InfoWindow({
      content: "Info",
    });
    console.log(Marker);
    const markers = storeList.map((store) =>
      store.list.map(
        (s) =>
          new naver.maps.Marker({
            position: new naver.maps.LatLng(
              s.position.latitude,
              s.position.longitude
            ),
            icon: {
              content: `<img alt="marker" src=${Marker.src} />`,
              size: new naver.maps.Size(32, 32),
              anchor: new naver.maps.Point(16, 16),
            },
            map: mapRef.current,
          })
      )
    );

    // mapRef.current = new naver.maps.Marker({
    //   naverMap,
    //   position: location, //마커 좌표
    // });

    return () => {
      mapRef.current.destroy();
    };
  }, []);

  return (
    <NaverMapStyle>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </NaverMapStyle>
  );
};

export default NaverMap;

const NaverMapStyle = styled.div`
  height: calc(100% - 50px);
`;
