import React from "react";
import { Fragment } from "react";
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

export default class EventPicker extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAccept = () => {
        this.setState({ open: false });
    };

    handleApplySelection = (selected) => {
        console.log("EventPicker", "handleApplySelection()");
        this.setState({ events: [] });
    };

    render() {
        const eventsSelected = this.props.eventsSelected;
        return (
            <Fragment>
                <Button onClick={this.handleClickOpen}>
                    Seleccionar eventos
                </Button>
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
                            eventsSelected={eventsSelected}
                            handleApplySelection={this.handleApplySelection}
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
