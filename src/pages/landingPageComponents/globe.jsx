import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export default function GlobeIndia() {
  const [hexData, setHexData] = useState([]);
  const globeRef = useRef();
  const containerRef = useRef();
  const [size, setSize] = useState({ width: 300, height: 300 });

  // ResizeObserver to track container size
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Load India GeoJSON
  useEffect(() => {
    fetch('/data/india-geo.json')
      .then((res) => res.json())
      .then((data) => setHexData(data.features));
  }, []);

  // Focus on India after data loads
  useEffect(() => {
    if (hexData.length > 0 && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: 22.5937, lng: 78.9629, altitude: 1.33 },
        1500
      );
    }
  }, [hexData]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square max-w-md sm:max-w-lg md:max-w-xl mx-auto rounded-full overflow-hidden shadow-xl"
    >
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        hexPolygonsData={hexData}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={() => '#facc15'}
        showAtmosphere={true}
        atmosphereColor="skyblue"
        atmosphereAltitude={0.1}
        width={size.width}
        height={size.height}
      />
    </div>
  );
}
