import React, { useEffect } from "react";

const KakaoMap = (cafe) => {
  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const lat = cafe.cafe.latitude;
      const lon = cafe.cafe.longitude;
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon), // 서울 중심 좌표
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커 좌표 배열 (이름 포함)
      const markerPositions = [{ lat: lat, lng: lon, title: cafe.cafe.name }];

      // 마커 및 인포윈도우 생성
      markerPositions.forEach((pos) => {
        const markerPosition = new window.kakao.maps.LatLng(pos.lat, pos.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:14px;">${pos.title}</div>`,
        });

        // 마커에 마우스를 올리면 인포윈도우 표시
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          infoWindow.open(map, marker);
        });

        // 마우스를 벗어나면 인포윈도우 닫기
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infoWindow.close();
        });
      });
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(loadKakaoMap);
      };
      document.head.appendChild(script);
    } else {
      loadKakaoMap();
    }
  }, []);

  return (
    <div id="map" style={{ width: "100%", height: "100%", borderRadius: 20 }} />
  );
};

export default KakaoMap;
