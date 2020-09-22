import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './map.scss';

import fetchGeopositionBySearch from './getCoordinatesFromAddress';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3RhY2V5c3ljaCIsImEiOiJja2FpaGw0N2YwMHUzMzRtaXNtazBtYXpkIn0.DPP70YMFkqRuAScBuq5_Gw';

const MapContainer = ({ place }) => {
  const mapContainerRef = useRef(null);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);

  fetchGeopositionBySearch(place).then((data) => {
    if (data) {
      const [longitude, latitude] = data.split(' ');
      setLatitude(latitude);
      setLongitude(longitude);
    }
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [Longitude, Latitude],
      zoom: 12.5,
    });

    new mapboxgl.Marker().setLngLat([Longitude, Latitude]).addTo(map);

    return () => map.remove();
  }, [Latitude, Longitude]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapContainer;
