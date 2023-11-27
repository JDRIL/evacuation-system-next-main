import mapboxgl, { Map, MapboxOptions } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

interface UseMapboxParams {
  defaultOptions?: Omit<MapboxOptions, "container">;
}

const useMapbox = ({ defaultOptions }: UseMapboxParams) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      zoom: 17,
      attributionControl: false,
      dragRotate: false,
      ...defaultOptions,
    });
  }, [mapContainer, defaultOptions]);

  return {
    map,
    mapContainer,
  };
};

export default useMapbox;
