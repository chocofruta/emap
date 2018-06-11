import React from "react";
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
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark
              },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
});

let EventsTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        FEN
                    </Typography>
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