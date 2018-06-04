import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default props => (
	<AppBar position="static" color="default">
		<Toolbar>
			<IconButton color="inherit" aria-label="Menu">
				<MenuIcon />
			</IconButton>
			<Typography
				variant="title"
				color="inherit"
				style={{ width: "100%", textAlign: "center" }}
			>
				Mapa de Eventos
			</Typography>
		</Toolbar>
	</AppBar>
);
