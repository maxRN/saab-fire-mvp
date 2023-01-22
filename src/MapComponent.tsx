import GoogleMapReact from 'google-map-react';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import * as d3 from 'd3';

type markerProps = {
    lat: number
    lng: number
    text: string
}

const Marker = ({ text }: markerProps) => {
    return (
        // "hello"
        <Icon icon="ph:map-pin-fill" height={"20"} />
    )
}

type onClickProps = {
    lat: number
    lng: number
    event: string
}

type Coord = {
    lat: number
    lng: number
}

function drawPolygon(coords: Coord[], API: any, map: any) {
    const poly = new API.current.Polygon({
        paths: coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    poly.setMap(map.current);
}

export default function SimpleMap() {
    const defaultProps = {
        center: {
            lat: 50.9064509,
            lng: 14.3204418,
        },
        zoom: 11
    };

    const mapsAPIref: any = useRef(null);
    const mapRef: any = useRef(null);

    const [corners, setCorners] = useState<{ lat: number, lng: number }[]>([]);

    function onClickOnMap({ lat, lng, event }: onClickProps) {
        setCorners((oldState: { lat: number, lng: number }[]) => [...oldState, { lat, lng }])
        console.log(lat, lng, event)
    }
    type APIProps = {
        map: any
        maps: any
        ref: any
    }

    function googleAPILoaded({ map, maps }: APIProps) {
        mapsAPIref.current = maps
        mapRef.current = map
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '80vh', width: '60vw' }}>
            <GoogleMapReact
                onClick={onClickOnMap}
                bootstrapURLKeys={{ key: "AIzaSyAj0-b3jl0qxB9vatFCSy9k5WlZsW_k7p4" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={googleAPILoaded}
            >
                {corners.map((pos, i) => (
                    <Marker
                        lat={pos.lat + 0.0045}
                        lng={pos.lng - 0.003}
                        text={"Marker " + (i + 1)}
                    />
                ))}
            </GoogleMapReact>
            <button onClick={() => drawPolygon(corners, mapsAPIref, mapRef)}>Draw polygon</button>
        </div>
    );
}
