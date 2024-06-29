import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer  } from 'react-leaflet'
import {Icon} from "leaflet";

function Map({lat, long}) {

    console.log(lat, long)

    const markers = [
      {
        geocode: [lat , long ],
        popUp: "Location",
      },
    ];

    const customIcon = new Icon({
        iconUrl: "../../public/icons/icon_ubicacion_map.png",
        iconSize: [38, 38]
    })

    return (
        <MapContainer className='h-[35rem]' center={[lat , long ]} zoom={13}>
            <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {markers.map((marker, index) => (
                <Marker key={index} icon={customIcon} position={marker.geocode} />
            ))}
        </MapContainer>
    )
}

export default Map;

