import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import styled from "styled-components";

const stlye = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "2.00",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#9c9c9c",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#ff0000",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#666666",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#666666",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#dddddd",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7b7b7b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station.rail",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "transit.station.rail",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#46bcec",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#c8d7d4",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#070707",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];

const zoomControlOptions = {
  position: 3,
  style: {
    width: "24px",
    height: "24px",
    margin: "8px",
    borderRadius: "16px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const customIcon = {
  url: "/path/to/custom-icon.png", // 커스텀 아이콘 이미지 경로
  scaledSize: new window.google.maps.Size(32, 32), // 아이콘 크기 조정
};

function MapComponent() {
  const center = useMemo(() => ({ lat: 37.545, lng: 127.01 }), []);

  return (
    <Wrapper>
      <LoadScriptNext
        googleMapsApiKey={`${process.env.NEXT_PUBLIC_API_KEY}`}
        mapIds={["345376d535ceaf4e"]}
      >
        <GoogleMap
          zoom={18}
          center={center}
          mapContainerClassName="map-container"
          options={{
            zoomControl: false,

            zoomControlOptions: zoomControlOptions,
            styles: stlye, // change default map styles
          }}
        >
          <MarkerF
            position={center}
            // icon={{ url: "/images/icons/map_marker.svg", scale: 5 }}
          />
          <MarkerF position={center} icon={customIcon} />
        </GoogleMap>
      </LoadScriptNext>
    </Wrapper>
  );
}
export default MapComponent;

const Wrapper = styled.div`
  .map-container {
    width: 100%;
    height: 500px;
  }
`;
