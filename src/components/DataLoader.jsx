import React from "react";
import axios from "axios";

const DataLoader = (Composed, url, params, parse) =>
	class DataLoader extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				data: [],
				loading: false,
			};
		}

		componentWillMount() {
			this.setState({ loading: true });
			axios
				.get(url)
				.then(result => {
					console.log("api call succeed");
					const parsed = parse ? parse(result.data) : result.data;
					console.log("parsed:", parsed);
					this.setState({
						data: parsed,
						loading: false,
					});
				})
				.catch(error => {
					console.log("!!", error);
					this.setState({
						loading: false,
						loadError: error,
					});
				});
		}

		render() {
			return (
				<Composed loading={this.state.loading} {...this.state.data} />
			);
		}
	};

export default DataLoader;
