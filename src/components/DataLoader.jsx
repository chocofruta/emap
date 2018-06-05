import React from "react";
import axios from "axios";

const DataLoader = (Composed, url, parse) =>
	class DataLoader extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				loading: false,
                error: false,
				data: [],
			};
			this.fetch = this.fetch.bind(this);
		}

		componentDidMount() {
			console.log("props:", this.props);
			const { load, params } = this.props;
			if (load) {
				//this.fetch(params);
				this.setState({ loading: true });
				setTimeout(() => this.fetch(params), 1000);
			}
		}

		fetch(params) {
			this.setState({ loading: true });
			axios
				.get(url)
				.then(result => {
					const parsed = parse ? parse(result.data) : result.data;
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
			const { loading, error } = this.state;
			return (
				<Composed
					loading={loading}
					error={error}
					{...this.state.data}
				/>
			);
		}
	};

export default DataLoader;
