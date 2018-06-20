import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

const SelectionDisplay = props => {
    const { events } = props;
    return (
        <List>
            {events.map(e => (
                <ListItem key={e.id}>
                    <ListItemText primary={e.desc} secondary={e.id} />
                </ListItem>
            ))}
        </List>
    );
};

SelectionDisplay.propTypes = {
    eventsSelected: PropTypes.array.isRequired
};
