import React from "react";
import Map from "./Map";

const key = "AIzaSyDxENfr1Xb81eoY5aiGY4iTroO-YTP_WkY";
const libs = "geometry,drawing,places";
const version = "3.exp";
const url = `https://maps.googleapis.com/maps/api/js?v=${version}&libraries=${libs}&key=${key}`;

export default class extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			markers: props.markers || []
		};
	}

	componentDidMount() {}

	handleMarkerClick = () => {
		console.log("info", "marker click!");
	};

	render() {
		const loading = <div style={{ flex: 1 }} />;
		const container = <div style={{ flex: 1, padding: 6 }} />;
		return (
			<Map
				googleMapURL={url}
				loadingElement={loading}
				containerElement={container}
				mapElement={<div style={{ height: "100%" }} />}
				defaultCenter={{ lat: -33.4724728, lng: -70.6641823 }}
				defaultZoom={12}
				markers={this.state.markers}
				onMarkerClick={this.handleMarkerClick}
			/>
		);
	}
}
