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

function drawPolygon(coords: Coordinate[], setCurrentPoly: any,  API: any, map: any) {
    if (coords.length === 0) {
        return
    }

    const poly = new API.current.Polygon({
        paths: coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    setCurrentPoly([]);
    poly.setMap(map.current);
}

type Coordinate = {
    lat: number
    lng: number
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

    // const [corners, setCorners] = useState<{ lat: number, lng: number }[]>([]);
    const [currentPoly, setCurrentPoly] = useState<Coordinate[]>([]);

    function onClickOnMap({ lat, lng }: onClickProps) {
        if (mapsAPIref.current === null || mapRef.current === null) {
            return
        }

        const marker = new mapsAPIref.current.Marker({
            position: {
                lat, lng
            },
            map: mapRef.current,
            title: "Marker " + (currentPoly.length + 1).toString()
        })
        // setCorners((oldState: { lat: number, lng: number }[]) => [...oldState, { lat, lng }])
        setCurrentPoly((oldState: { lat: number, lng: number }[]) => [...oldState, { lat, lng }])
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
        <div style={{ height: '80vh', width: '60vw', marginBottom: '2em' }}>
            <GoogleMapReact
                onClick={onClickOnMap}
                bootstrapURLKeys={{ key: "AIzaSyAj0-b3jl0qxB9vatFCSy9k5WlZsW_k7p4" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={googleAPILoaded}
            >
            </GoogleMapReact>
            <button onClick={() => drawPolygon(currentPoly, setCurrentPoly, mapsAPIref, mapRef)} style={{ margin: "1em" }}>
                Draw polygon
            </button>
        </div>
    );
}
