// Map.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Iconos para Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Componentes
import FormCoordinate from './FormCoordinate';

// Configurar ícono por defecto
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Recentrar mapa si es necesario
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
};

const Map = ({ showFires, handleGenerate }) => {
  const [fires, setFires] = useState([
    {
      id: 1,
      position: [-15.912, -63.5],
      size: 6.0,
      imageIndex: 0,
      images: [
        '/img/incendios_2016.png',
        '/img/incendios_2017.png',
        '/img/incendios_2018.png',
        '/img/incendios_2019.png',
        '/img/incendios_2020.png',
        '/img/incendios_2021.png',
        '/img/incendios_2022.png',
        '/img/incendios_2023.png',
      ],
    },
  ]);

  const [mapCenter, setMapCenter] = useState(fires[0].position); // El centro del mapa
  const [coordinates, setCoordinates] = useState([]); // Coordenadas manualmente agregadas
  const [lat, setLat] = useState(''); // Latitud del formulario
  const [lng, setLng] = useState(''); // Longitud del formulario

  const [ws, setWs] = useState(''); // Latitud del formulario
  const [wd, setWd] = useState(''); // Longitud del formulario

  // Cambiar imagen de cada foco cada 
  useEffect(() => {
    const interval = setInterval(() => {
      setFires((prevFires) =>
        prevFires.map((fire) => ({
          ...fire,
          imageIndex: (fire.imageIndex + 1) % fire.images.length,
        }))
      );
    }, 1000); // cada 1 segundo

    return () => clearInterval(interval);
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleLatChange = (e) => setLat(e.target.value);
  const handleLngChange = (e) => setLng(e.target.value);
  const handleWs = (e) => setWs(e.target.value);
  const handleWd = (e) => setWd(e.target.value);

  // Función para agregar coordenada al mapa
  const handleAddCoordinate = (e) => {
    e.preventDefault();

    if (!lat || !lng) {
      alert('Por favor ingresa una latitud y longitud válidas.');
      return;
    }

    const newCoordinate = [parseFloat(lat), parseFloat(lng)];
    setCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinate]);

    // Limpiar los campos del formulario
    setLat('');
    setLng('');
  };

  return (
    <div className="map-container">
      {/* FORMULARIO DE COORDENADAS */}
      <FormCoordinate
        lat={lat}
        lng={lng}
        handleLatChange={handleLatChange}
        handleLngChange={handleLngChange}
        handleAddCoordinate={handleAddCoordinate}
        ws={ws}
        wd={wd}
        handleWs={handleWs}
        handleWd={handleWd}
      />

      {/* MAPA */}
      <MapContainer
        center={mapCenter} // Usamos el estado del centro del mapa
        zoom={5}
        style={{ height: '670px', width: '1380px', left:'50px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterMap position={mapCenter} />

        {/* FOCOS DE INCENDIO - SOLO IMÁGENES SIN MARCADORES */}
        {showFires &&
          fires.map((fire) => {
            const { id, position, size, imageIndex, images } = fire;
            const bounds = [
              [position[0] - size, position[1] - size],
              [position[0] + size, position[1] + size],
            ];

            return (
              <React.Fragment key={id}>
              <ImageOverlay
                url={images[imageIndex]}
                bounds={bounds}
                opacity={0.6}
                zIndex={500}
              />
              <Popup position={position} offset={[200, -50]}> {/* Ajustamos el offset */}
                {images[imageIndex].split('/').pop().replace('.png', '')} <br />
              </Popup>
            </React.Fragment>
            

            );
          })}

        {/* COORDENADAS INGRESADAS MANUALMENTE - AÑADIR MARCADORES */}
        {coordinates.map((coordinate, index) => (
          <React.Fragment key={index}>
            <Marker position={coordinate}>
              <Popup>
                Coordenada {index + 1}: {coordinate[0]}, {coordinate[1]}
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>

      {/* BOTÓN PARA GENERAR FOCOS */}
      <div className="generate-fires-btn" style={{ position: 'absolute', bottom: '20px', right: '120px' }}>
        <button onClick={handleGenerate}>View Fires</button>
      </div>
    </div>
  );
};

export default Map;
