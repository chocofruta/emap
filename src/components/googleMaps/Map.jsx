import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import RedCircle from "./RedCircle";

const Map = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={props.defaultZoom}
			defaultCenter={props.defaultCenter}
		>
			{props.markers &&
				props.markers.map((mk, i) => (
					<RedCircle
						key={i}
						lat={mk.lat}
						lng={mk.lng}
						onClick={props.onMarkerClick}
					/>
				))}
		</GoogleMap>
	))
);

export default Map;
