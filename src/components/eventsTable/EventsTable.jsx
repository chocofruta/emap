import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EventsTableHead from "./EventsTableHead";
import EventsTableToolbar from "./EventsTableToolbar";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    }
});

class EventsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: "asc",
            orderBy: "id",
            selected: [],
            data: props.events || [],
            page: 0,
            rowsPerPage: 5
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        const data =
            order === "desc"
                ? this.state.data.sort(
                      (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
                  )
                : this.state.data.sort(
                      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
                  );

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const {
            data,
            order,
            orderBy,
            selected,
            rowsPerPage,
            page
        } = this.state;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EventsTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        <EventsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event =>
                                                this.handleClick(event, n.id)
                                            }
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.calories}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.fat}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.carbs}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.protein}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EventsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsTable);
