import React from "react";
import { Fragment } from "react";
import { Tabs, Tab, Typography } from "@material-ui/core";
import EventsGoogleMap from "../googleMaps/EventsGoogleMap";

export default props => {
	const {loading} = props;
	return (
		<Fragment>
			<Tabs
				value={0}
				onChange={x => x}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Mapa" />
				<Tab label="Grilla" />
			</Tabs>
			{loading ? (
				<Typography style={{ margin: "auto" }} variant="display1">
					CARGANDO
				</Typography>
			) : (
				<EventsGoogleMap {...props} />
			)}
		</Fragment>
	);
};
