import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import RedCircle from "./RedCircle";

class Map extends React.Component {
    google = window.google;

    constructor(props) {
        super(props);
        this.bounds = new this.google.maps.LatLngBounds();
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        const { markers } = this.props;
        const google = this.google;
        if (markers.length) {
            markers.forEach(mk => {
                this.bounds.extend(new google.maps.LatLng(mk.lat, mk.lng));
            });
            //this.mapRef.current.panToBounds(this.bounds);
            this.mapRef.current.fitBounds(this.bounds);
        }
    }

    render() {
        const {
            defaultZoom,
            defaultCenter,
            markers,
            onMarkerClick
        } = this.props;
        return (
            <GoogleMap
                ref={this.mapRef}
                defaultZoom={defaultZoom}
                defaultCenter={defaultCenter}
            >
                {markers.map((mk, i) => (
                    <RedCircle
                        key={i}
                        lat={mk.lat}
                        lng={mk.lng}
                        onClick={onMarkerClick}
                    />
                ))}
            </GoogleMap>
        );
    }
}

Map.propTypes = {
    defaultZoom: PropTypes.number,
    defaultCenter: PropTypes.object,
    onMarkerClick: PropTypes.func,
    markers: PropTypes.array
};

export default withScriptjs(withGoogleMap(Map));
