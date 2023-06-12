import { useEffect } from "react";
import styled from "styled-components";

interface IsNaverMap {}

export const NaverMap = ({}: IsNaverMap) => {
  useEffect(() => {
    // Naver Map 초기화
    const naverMap = new naver.maps.Map("map", {
      // 맵 옵션 설정
      center: new naver.maps.LatLng(37.123, 127.456),
      zoom: 10,
    });

    // 추가적인 맵 설정 및 마커 등 추가 작업 수행
    // ...

    // 컴포넌트 언마운트 시 Naver Map 인스턴스 정리
    return () => {
      naverMap.destroy();
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
  height: 100%;
`;
