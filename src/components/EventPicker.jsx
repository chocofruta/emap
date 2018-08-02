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
import moment from "moment";

const EventsLoader = DataLoader(
    EventsTable,
    "http://desannoc.vtr.cl/pmenares/emap/controller.php?mod=fen",
    "get",
    data => {
		if (typeof data === "object") {
	        return {
	            events: data || [],
	            eventsType: "fen"
	        };
		} else {
			console.log("!!", "not an object type");
			return { error: data };
		}
    }
);

class EventPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            eventsForSelect: props.eventsSelected,
            ffin: moment(),
            fini: moment().add(-12, "hour")
        };

        this.datefmt = "YYYY-MM-DD HH:mm";
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(e) {
        this.setState({
            eventsForSelect: e
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
							ffin={this.state.ffin}
							fini={this.state.fini}
                            params={{
								ffin: this.state.ffin.format(this.datefmt),
                                fini: this.state.fini.format(this.datefmt)
                            }}
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
    eventsSelected: PropTypes.array.isRequired,
	handleApplySelection: PropTypes.func.isRequired
};

export default EventPicker;
