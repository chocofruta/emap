import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Aside, DataSection } from "./layouts";
import DataLoader from "./DataLoader";

const styles = theme => ({
	app: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	paper: {
		flex: 1,
	},
	container: {
		height: "100%",
	},
	gridItemDataSection: {
		display: "flex",
		flexDirection: "column",
	},
});

const DataSectionLoader = DataLoader(
	DataSection,
	"https://ipapi.co/200.83.2.5/json/",
	data => {
		return {
			markers: [
				{
					lat: data.latitude,
					lng: data.longitude,
				},
			],
		};
	},
);

const AsideLoader = DataLoader(
	Aside,
	"https://ipapi.co/200.83.2.5/json/",
	data => {
		return {
			events: [{ id_evento: 1, fecha: "05/06/2018 07:41" }],
			eventsType: "fen",
		};
	},
);

// const DataSectionLoader = DataLoader(
//     DataSection,
//     "http://desannoc.vtr.cl/pmenares/emap/controller.php?mod=test",
//     data => {
//         return {
//             markers: data.map(c => ({ lat: c.lat, lng: c.lng }))
//         };
//     }
// );
//
// const AsideLoader = DataLoader(
// 	Aside,
// 	"http://desannoc.vtr.cl/pmenares/emap/controller.php?mod=fen",
// 	data => {
// 		return {
// 			events: data,
// 			eventsType: "fen",
// 		};
// 	},
// );

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsSelected: [],
        };
        // this.fetch = this.fetch.bind(this);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                <CssBaseline />
                <Header />
                <Paper square={false} className={classes.paper}>
                    <Grid container className={classes.container}>
                        <Grid item xs={4} style={{ maxWidth: 350 }}>
                            <AsideLoader />
                        </Grid>
                        <Grid item xs className={classes.gridItemDataSection}>
                            <DataSectionLoader load={true} />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
