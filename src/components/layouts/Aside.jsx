import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import FilterList from "@material-ui/icons/FilterList";
import EventsSelection from "../EventsSelection";
import EventPicker from "../EventPicker";
import FetchLocations from "../FetchLocations";

const styles = theme => ({
    aside: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary
    },
    header: {
        paddingTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2
    }
});

const Aside = props => {
    const { classes, eventsSelected, handleApplySelection } = props;
    return (
        <aside className={classes.aside}>
            <header className={classes.header}>
                <Typography variant="headline" align="center">
                    <FilterList color="primary" />FILTROS
                </Typography>
            </header>
            <EventPicker
                eventsSelected={eventsSelected}
                handleApplySelection={handleApplySelection}
            />
            <EventsSelection />
            <FetchLocations />
        </aside>
    );
};

Aside.propTypes = {
    classes: PropTypes.object.isRequired,
    eventsSelected: PropTypes.array.isRequired,
    handleApplySelection: PropTypes.func.isRequired
};

export default withStyles(styles)(Aside);
