import React from "react";
import { Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Tooltip, IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.primary.main,
                  backgroundColor: lighten(theme.palette.primary.light, 0.3)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.primary.dark
              },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.primary
    },
    title: {
		display: "flex",
        flex: "0 0 auto"
    }
});

const EventsTableToolbar = props => {
    const { numSelected, ffin, fini, classes } = props;
    const datefmt = "YYYY-MM-DD HH:mm";

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} eventos seleccionados
                    </Typography>
                ) : (
                    <Fragment>
                        <Typography variant="title">FEN</Typography>
                        <Typography variant="subheading" style={{fontSize: ".9em", marginLeft: 10}}>
                            {fini.format(datefmt)} - {ffin.format(datefmt)}
                        </Typography>
                    </Fragment>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EventsTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(EventsTableToolbar);
