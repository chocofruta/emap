import React from "react";
import { Circle } from "react-google-maps";

const options = {
	strokeColor: "#FF0000",
	strokeOpacity: 0.8,
	strokeWeight: 1,
	fillColor: "#FF0000",
	fillOpacity: 0.5,
	radius: 700
};

export default props => {
	const { key, lat, lng, onClick } = props;
	return (
		<Circle
			key={key}
			center={{ lat, lng }}
			onClick={onClick}
			options={options}
		/>
	);
};
