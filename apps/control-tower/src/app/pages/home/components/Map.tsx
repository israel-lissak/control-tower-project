import { useEffect, useRef, useState } from 'react';

import Map from 'ol/Map.js';
// Import - Import for View
import View from 'ol/View.js';
// Import - Import for Layers and Layers Source
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
// Import - Import for Controls
import { MousePosition } from 'ol/control';
// Import - Import for function that creates cordinates
import { createStringXY } from 'ol/coordinate';


import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';

import { useAtom } from 'jotai';
import { flightsLocation } from '../app'

interface MapComponentProps {
    points: {height: number, width: number }[];
  }


function MapComponent() {

  const [points, setPoints] = useAtom(flightsLocation)

  const features = points.map((point) => new Feature(new Point([point.height, point.width])));

  
  // State inizialization - State for Map ref and Map
  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()


  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://cdn-icons-png.flaticon.com/128/1574/1574050.png',
      width: 20
    }),
  });

  const markersLayer = new VectorLayer({
    source: new VectorSource({
      features
    }),
    style: iconStyle
  });
  

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
        markersLayer
      ],
      view: new View({
        center: [0,0],
        zoom: 4,
        minZoom: 0,
        maxZoom: 28,
      }),
    })
    map.setTarget(mapTargetElement.current || "")
    setMap(map)
    return () => map.setTarget("")
  }, [points])

  
  return (
    <>
      <div
        ref={mapTargetElement}
        className="map"
        style={{
          width: "85vw",
          height: "400px",
          position: "relative",
        }} >
      </div>
    </>
  )
}

export default MapComponent