import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import FilterList from "@material-ui/icons/FilterList";
import EventsSelection from "../EventsSelection";
import FetchLocations from "../FetchLocations";

const styles = theme => ({
	aside: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
	},
	header: {
		paddingTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 2,
	},
});

const Aside = props => {
	const { classes } = props;
	return (
		<aside className={classes.aside}>
			<header className={classes.header}>
				<Typography variant="headline" align="center">
					<FilterList color="primary" />FILTROS
				</Typography>
			</header>
			<EventsSelection />
			<FetchLocations />
		</aside>
	);
};

export default withStyles(styles)(Aside);
