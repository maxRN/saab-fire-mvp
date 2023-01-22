import GoogleMapReact from 'google-map-react';

type markerProps = {
    lat: number
    lng: number
    text: string
}

const AnyReactComponent = ({ text }: markerProps) => <div>{text}</div>;

export default function SimpleMap() {
    const defaultProps = {
        center: {
            lat: 50.9064509,
            lng: 14.3204418,
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAj0-b3jl0qxB9vatFCSy9k5WlZsW_k7p4" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={50.9064509}
                    lng={14.3204418}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}
