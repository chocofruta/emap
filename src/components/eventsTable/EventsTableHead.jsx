import React from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Tooltip,
    Checkbox,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel
} from "@material-ui/core";
import columnData from "./columnData";

class EventsTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={
                                    column.disablePadding ? "none" : "default"
                                }
                                sortDirection={
                                    orderBy === column.id ? order : false
                                }
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={
                                        column.numeric
                                            ? "bottom-end"
                                            : "bottom-start"
                                    }
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(
                                            column.id
                                        )}
                                    >
                                        <Typography noWrap>
                                            {column.label}
                                        </Typography>
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EventsTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default EventsTableHead;
