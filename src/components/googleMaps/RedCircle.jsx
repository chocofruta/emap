import React from "react";
import PropTypes from "prop-types";
import { Circle } from "react-google-maps";

const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: "#FF0000",
    fillOpacity: 0.5,
    radius: 10
};

const RedCircle = props => {
    const { lat, lng, onClick } = props;
    return (
        <Circle
            center={{ lat, lng }}
            onClick={onClick}
            options={options}
        />
    );
};

RedCircle.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
	onClick: PropTypes.func
};

export default RedCircle;
