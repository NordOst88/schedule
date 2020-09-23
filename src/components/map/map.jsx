import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { GLOBAL_COORDS, MAP_ZOOM, MAP_BOX_TOKEN } from '../../constants/mapConstants';

import getCoordinatesFromAddress from '../../utils/getCoordinatesFromAddress';

import './map.scss';

mapboxgl.accessToken = MAP_BOX_TOKEN;

const MapContainer = ({ place }) => {
  const mapContainerRef = useRef(null);
  const [lat, setLatitude] = useState(GLOBAL_COORDS);
  const [long, setLongitude] = useState(GLOBAL_COORDS);

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
      center: [long, lat],
      zoom: MAP_ZOOM,
    });

    new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);

    return () => map.remove();
  }, [lat, long]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapContainer;
