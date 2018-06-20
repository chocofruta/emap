import React from "react";
import PropTypes from "prop-types";
import {
    Typography,
    TableBody,
    TableCell,
    TableRow,
    Checkbox,
	LinearProgress
} from "@material-ui/core";
import columnData from "./columnData";

const EventsTableBody = props => {
    const { pageData, isSelected, handleClick, loading } = props;
    if (loading) {
        return (
            <TableBody>
                <TableRow style={{ height: 49 }}>
                    <TableCell colSpan={columnData.length+1} style={{padding: "10px 25px"}}>
                        {/*<Typography variant="headline">CARGANDO...</Typography>*/}
						<LinearProgress />
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }
    return (
        <TableBody>
            {pageData.map(n => {
                const selected = isSelected(n.EVENT_ID);
                return (
                    <TableRow
                        hover
                        onClick={event => handleClick(event, n.EVENT_ID)}
                        role="checkbox"
                        aria-checked={selected}
                        tabIndex={-1}
                        key={n.EVENT_ID}
                        selected={selected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox checked={selected} />
                        </TableCell>
                        {columnData.map(c => (
                            <TableCell numeric={c.numeric} key={c.id}>
                                <Typography noWrap>{n[c.id]}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

EventsTableBody.propTypes = {
    pageData: PropTypes.array.isRequired,
    isSelected: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default EventsTableBody;
