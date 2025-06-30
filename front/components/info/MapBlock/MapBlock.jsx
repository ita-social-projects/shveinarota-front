import "./MapBlock.css";
import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-gesture-handling';
import { useLang } from "$component/Context/LangContext";
import Link from "next/link";
import { getData } from "api";
import Image from "next/image";
import SidebarSearch from '$component/info/MapBlock/SidebarSearch/SidebarSearch';
import { convertToId } from "@lib/utils";

L.Map.addInitHook("addHandler", "gestureHandling", L.GestureHandling);

const PassMapToSidebar = ({ markers, handleZoom, openPopupById }) => {
  const map = useMap();
  return (
    <SidebarSearch
      markers={markers}
      handleZoom={handleZoom}
      openPopupById={openPopupById}
      disableMapInteraction={() => map.dragging.disable()}
      enableMapInteraction={() => map.dragging.enable()}
    />
  );
};

const MapBlock = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false); // 🔹 додаємо стан
  const markersRef = useRef({});
  const { lang } = useLang();

  // 🔹 Визначаємо, чи пристрій підтримує touch
  useEffect(() => {
    const checkTouch = () =>
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    getData("markers", setMarkers);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const closeFullscreen = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFullscreen(false);
      setIsClosing(false);
    }, 400);
  };

  const handleOpenFullscreen = () => {
    if (isTouchDevice) {
      setIsFullscreen(true);
    }
  };


  const customIcon = L.icon({
    iconUrl: 'images/map/location.svg',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
    tooltipAnchor: [0, -48],
    className: 'custom-marker-icon'
  });

  const ZoomToPoint = ({ lat, lng }) => {
    const map = useMap();
    map.flyTo([lat, lng], 7);
    return null;
  };

  const handleZoom = (lat, lng, id) => {
    setSelectedPoint({ lat, lng });
    openPopupById(id);
  };

  const openPopupById = (id) => {
    const marker = markersRef.current[id];
    if (marker) {
      marker.openPopup();
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const mapClass = `map ${isFullscreen
    ? isClosing
      ? "map--fullscreen map--closing"
      : "map--fullscreen"
    : ""
    }`;

  return (
    <div className={mapClass}>
      {isFullscreen && <div className="map__placeholder" />}
      <div className="map__container">
        {!isFullscreen && (
          <>
            <h2 className="map__title _main-title">
              {lang === 'ua' ? "Географія Швейної роти" : "Geography of Shveyna Rota"}
            </h2>
            <div className="map_line"></div>
          </>
        )}

        <div className="map__body">
          {!isFullscreen && isTouchDevice && (
            <div
              className="map__fullscreen-overlay"
              onClick={handleOpenFullscreen}
              title={lang === 'ua' ? "Відкрити на весь екран" : "Open fullscreen"}
            ></div>
          )}



          <MapContainer
            center={[50.27, 30.31]}
            zoom={5}
            maxZoom={7}
            scrollWheelZoom={!isFullscreen && !isTouchDevice} // ⬅️ дозволяє скролити на ПК у нормальному режимі
            style={{
              height: '100%',
              width: '100%',
              borderRadius: "5px",
              position: 'relative'
            }}
          >

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
                icon={customIcon}
                ref={(ref) => {
                  if (ref) {
                    markersRef.current[marker.id] = ref;
                  }
                }}
                eventHandlers={{
                  click: (e) => {
                    e.target.openPopup();
                    setSelectedPoint({ lat: marker.lat, lng: marker.lng });
                  }
                }}
              >
                <Popup>
                  <div className="marker">
                    <div className="marker__logo">
                      <Image
                        src={'http://drive.google.com/uc?export=view&id=' + convertToId(marker.path)}
                        height={105}
                        width={105}
                        alt="icon"
                      />
                    </div>
                    <div className="marker__body">
                      <h3 className="marker__title">{marker.title}</h3>
                      <div className="marker__number">
                        Зв'язатися з нами:<br />
                        <Link href={marker.link || "#"}>
                          {marker.link ? truncateText(marker.link, 40) : "Посилання відсутнє"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {selectedPoint && <ZoomToPoint lat={selectedPoint.lat + 3} lng={selectedPoint.lng} />}

            <div className="sidebar-container" style={{ pointerEvents: 'none' }}>
              <PassMapToSidebar
                markers={markers}
                handleZoom={handleZoom}
                openPopupById={openPopupById}
              />
            </div>

            {isFullscreen && (
              <div className="map__collapse-inside">
                <button
                  className="map__fullscreen-button"
                  onClick={closeFullscreen}
                >
                  {lang === 'ua' ? "Згорнути" : "Collapse"}
                </button>
              </div>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapBlock;
