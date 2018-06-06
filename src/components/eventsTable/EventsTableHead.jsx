import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";

const columnData = [
    { id: "id", numeric: true, label: "ID Evento" },
    { id: "type", numeric: false, label: "Tipo" },
    { id: "state", numeric: false, label: "Estado" },
    { id: "eventdate", numeric: false, label: "Fecha Evento" },
    { id: "solvedate", numeric: false, label: "Fecha Solución" },
    { id: "enddate", numeric: false, label: "Fecha Final" },
    { id: "escdate", numeric: false, label: "Fecha Escalamiento" },
    { id: "service", numeric: false, label: "Servicio" },
    { id: "system", numeric: false, label: "Sistema" },
    { id: "subsys", numeric: false, label: "Subsistema" },
    { id: "totalp", numeric: true, label: "Total Pot." },
    { id: "problem", numeric: false, label: "Problema" },
    { id: "severity", numeric: true, label: "Criticidad" },
    { id: "zona", numeric: false, label: "Zona" },
    { id: "localidad", numeric: false, label: "Localidad" },
    { id: "nodo", numeric: false, label: "Nodo" },
    { id: "cuadrante", numeric: false, label: "Cuadrante" },
    { id: "georef", numeric: false, label: "Geo Ref." }
];

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
                                        {column.label}
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
