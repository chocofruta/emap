import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Aside, DataSection } from "./layouts";
import DataLoader from "./DataLoader";

const styles = theme => ({
	app: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	paper: {
		flex: 1,
	},
	container: {
		height: "100%",
	},
	gridItemDataSection: {
		display: "flex",
		flexDirection: "column",
	},
});

const DataSectionLoader = DataLoader(
	DataSection,
	"https://ipapi.co/200.83.2.5/json/",
	[],
	data => {
		return {
			markers: [
				{
					lat: data.latitude,
					lng: data.longitude,
				},
			],
		};
	},
);

// const DataSectionLoader = DataLoader(
// 	DataSection,
// 	"https://apis.digital.gob.cl/dpa/comunas",
// 	[],
// 	data => data.map(c => ({lat: c.lat, lng: c.lng}))
// );

const App = props => {
	const { classes } = props;
	return (
		<div className={classes.app}>
			<CssBaseline />
			<Header />
			<Paper square={false} className={classes.paper}>
				<Grid container className={classes.container}>
					<Grid item xs={4} style={{ maxWidth: 350 }}>
						<Aside />
					</Grid>
					<Grid item xs className={classes.gridItemDataSection}>
						<DataSectionLoader {...props} />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default withStyles(styles)(App);
