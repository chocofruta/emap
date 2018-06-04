import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

const events = [
	{
		name: "Fen A",
		type: "piramidal",
		severity: 66
	},
	{
		name: "Fen B",
		type: "cúbico",
		severity: 7
	},
	{
		name: "Fen C",
		type: "oblicuo",
		severity: 1
	}
];

const styles = theme => ({
	tableCell: {
		padding: "4px 6px"
	},
	tableRow: {
		height: 36
	}
});

const EventsSelection = props => {
	const { classes } = props;
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell className={classes.tableCell}></TableCell>
					<TableCell className={classes.tableCell}>Fen</TableCell>
					<TableCell className={classes.tableCell}>Tipo</TableCell>
					<TableCell className={classes.tableCell}>Gravedad</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{events.map((e, i) => {
					return (
						<TableRow
							key={i}
							hover
							className={classes.tableRow}
						>
							<TableCell className={classes.tableCell}>
								<Checkbox/>
							</TableCell>
							<TableCell className={classes.tableCell}>
								{e.name}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{e.type}
							</TableCell>
							<TableCell numeric className={classes.tableCell}>
								{e.severity}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default withStyles(styles)(EventsSelection);
