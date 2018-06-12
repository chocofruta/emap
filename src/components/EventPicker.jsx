import React from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EventsTable from "./eventsTable/EventsTable";
import DataLoader from "./DataLoader";

const EventsLoader = DataLoader(
    EventsTable,
    "http://desannoc.vtr.cl/pmenares/emap/controller.php?mod=fen",
    data => {
        return {
            events: data || [],
            eventsType: "fen"
        };
    }
);

class EventPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            eventsForSelect: props.eventsSelected
        };

        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(eid) {
        this.setState({
            eventsForSelect: eid
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAccept = () => {
        this.props.handleApplySelection(this.state.eventsForSelect);
        this.setState({ open: false });
    };

    render() {
        const { eventsSelected } = this.props;
        const button = eventsSelected.length ? (
            <Button color="primary" onClick={this.handleClickOpen}>
                {eventsSelected.length} eventos seleccionados
            </Button>
        ) : (
            <Button onClick={this.handleClickOpen}>Seleccionar eventos</Button>
        );
        return (
            <Fragment>
                {button}
                <Dialog
                    maxWidth="md"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">
                        Selección de Eventos
                    </DialogTitle>
                    <DialogContent>
                        <EventsLoader
                            eventsForSelect={this.state.eventsForSelect}
                            handleSelection={this.handleSelection}
                            load={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAccept} color="primary">
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

EventPicker.propTypes = {
    eventsSelected: PropTypes.array.isRequired
};

export default EventPicker;
