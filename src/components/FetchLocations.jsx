import React from "react";
import { Button } from "@material-ui/core";
import PinDrop from "@material-ui/icons/PinDrop";

export default props => {
    const {hdlFetchLocations} = props;
	return (
		<div style={{textAlign: "center", padding: "20px 0"}}>
			<Button variant="raised" color="secondary" onClick={hdlFetchLocations}>
				<PinDrop />
				Mapear
			</Button>
		</div>
	);
};
