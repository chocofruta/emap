import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
    root: {
		flex: 1,
        width: "100%"
    },
    subheading: {
        fontSize: ".9rem"
    },
    body1: {
        fontSize: ".8rem"
    }
});

const SelectionDisplay = props => {
    const { eventsSelected, classes } = props;
    return (
        <List className={classes.root}>
            {eventsSelected.map(e => (
                <ListItem divider={true} key={e.EVENT_ID}>
                    <ListItemText
                        primaryTypographyProps={{
                            noWrap: true,
                            className: classes.subheading
                        }}
                        secondaryTypographyProps={{ className: classes.body1 }}
                        primary={e.PROBLEM}
                        secondary={"id: " + e.EVENT_ID}
                    />
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                </ListItem>
            ))}
        </List>
    );
};

SelectionDisplay.propTypes = {
    eventsSelected: PropTypes.array.isRequired
};

export default withStyles(styles)(SelectionDisplay);
