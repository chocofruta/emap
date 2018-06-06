import React from "react";
import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EventsTable from "./eventsTable/EventsTable";

export default class EventPicker extends React.Component {
	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const eventsSelected = this.props.eventsSelected
		return (
			<Fragment>
				<Button onClick={this.handleClickOpen}>
					Seleccionar eventos
				</Button>
				<Dialog maxWidth="md" open={this.state.open} onClose={this.handleClose}>
					<DialogTitle id="form-dialog-title">
						Selección de Eventos
					</DialogTitle>
					<DialogContent>
						<EventsTable eventsSelected={eventsSelected} />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleClose} color="primary">
							Aceptar
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}
