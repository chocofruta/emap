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
    "https://ipapi.co/200.83.2.5/json/",
    data => {
        return {
            markers: [
                {
                    lat: data.latitude,
                    lng: data.longitude
                }
            ]
        };
    }
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsSelected: []
        };
        // this.fetch = this.fetch.bind(this);
        this.handleApplySelection = this.handleApplySelection.bind(this);
    }

    handleApplySelection(eid) {
        this.setState({
            eventsSelected: eid
        });
    }

    render() {
        const { classes } = this.props;
        const { eventsSelected } = this.state;
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
                            <DataSectionLoader load={true} />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
