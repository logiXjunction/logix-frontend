import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export default function GlobeIndia() {
  const [hexData, setHexData] = useState([]);
  const globeRef = useRef();

  useEffect(() => {
    // Load India GeoJSON
    fetch('/data/india-geo.json')
      .then((res) => res.json())
      .then((data) => setHexData(data.features));
  }, []);

  useEffect(() => {
    // Focus on India once globe is ready and data is loaded
    if (hexData.length > 0 && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: 22.5937, lng: 78.9629, altitude: 1.5 },
        1500 // ms
      );
    }
  }, [hexData]);

  return (
    <div className="w-[560px] h-[560px] flex justify-center items-center rounded-full overflow-hidden shadow-xl">
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
  width={600}
  height={600}
/>

    </div>
  );
}
