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
        flexDirection: "column"
    },
    paper: {
        flex: 1
    },
    container: {
        height: "100%"
    },
    gridItemDataSection: {
        display: "flex",
        flexDirection: "column"
    }
});

const DataSectionLoader = DataLoader(
    DataSection,
    "http://desannoc.vtr.cl/pmenares/emap/controller.php?mod=geo",
    "post",
    data => {
        if (typeof data === "object") {
            return {
                markers: data.map(c => ({
                    lat: Number(c.LAT),
                    lng: Number(c.LNG)
                }))
            };
		} else {
			console.log("!!", "not an object type");
			return { error: data };
		}
    }
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			load: false,
            eventsSelected: []
        };

        this.handleApplySelection = this.handleApplySelection.bind(this);
    }

    handleApplySelection(e) {
        this.setState({
			load: true,
            eventsSelected: e
        });
    }

    render() {
        const { classes } = this.props;
        const { load, eventsSelected } = this.state;
        console.log("eventsSelected", eventsSelected);
        return (
            <div className={classes.app}>
                <CssBaseline />
                <Header />
                <Paper square={false} className={classes.paper}>
                    <Grid container className={classes.container}>
                        <Grid item xs={4} style={{ maxWidth: 350 }}>
                            <Aside
                                eventsSelected={eventsSelected}
                                handleApplySelection={this.handleApplySelection}
                            />
                        </Grid>
                        <Grid item xs className={classes.gridItemDataSection}>
                            <DataSectionLoader
                                load={load}
                                params={{ eid: eventsSelected }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
