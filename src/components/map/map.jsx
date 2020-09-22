import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { GLOBAL_COORDS, MAP_ZOOM, MAP_BOX_TOKEN } from '../../constants/mapConstants';

import getCoordinatesFromAddress from '../../utils/getCoordinatesFromAddress';

import './map.scss';

mapboxgl.accessToken = MAP_BOX_TOKEN;

const MapContainer = ({ place }) => {
  const mapContainerRef = useRef(null);
  const [Latitude, setLatitude] = useState(GLOBAL_COORDS);
  const [Longitude, setLongitude] = useState(GLOBAL_COORDS);

  getCoordinatesFromAddress(place).then((data) => {
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
      zoom: MAP_ZOOM,
    });

    new mapboxgl.Marker().setLngLat([Longitude, Latitude]).addTo(map);

    return () => map.remove();
  }, [Latitude, Longitude]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapContainer;
