import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Table, TablePagination } from "@material-ui/core";
import EventsTableHead from "./EventsTableHead";
import EventsTableToolbar from "./EventsTableToolbar";
import EventsTableBody from "./EventsTableBody";

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
            data: props.events || [],
            page: 0,
            rowsPerPage: 5
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.events ? props.events : state.data
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
        const handleSelection = this.props.handleSelection;
        handleSelection(checked ? this.state.data.map(n => n.EVENT_ID) : []);
    };

    handleClick = (event, id) => {
        const selected = this.props.eventsForSelect;
        const handleSelection = this.props.handleSelection;
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

        handleSelection(newSelected);
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.props.eventsForSelect.indexOf(id) !== -1;

    render() {
        const { classes, eventsForSelect, ffin, fini, loading } = this.props;
        const { data, order, orderBy, rowsPerPage, page } = this.state;
        const pageData = data.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );

        return (
            <Paper className={classes.root}>
                <EventsTableToolbar
                    numSelected={eventsForSelect.length}
                    ffin={ffin}
                    fini={fini}
                />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        <EventsTableHead
                            numSelected={eventsForSelect.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <EventsTableBody
                            pageData={pageData}
                            isSelected={this.isSelected}
                            handleClick={this.handleClick}
                            loading={loading}
                        />
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
    eventsForSelect: PropTypes.array.isRequired,
    handleSelection: PropTypes.func.isRequired,
    events: PropTypes.array
};

export default withStyles(styles)(EventsTable);
