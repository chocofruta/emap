import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const DataLoader = (Composed, url, method, parse) =>
    class DataLoader extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                error: false,
                data: []
            };
            this.fetch = this.fetch.bind(this);
        }

        componentDidMount() {
            const { load, params } = this.props;
            if (load) {
                this.fetch(params);
                //this.setState({ loading: true });
                //setTimeout(() => this.fetch(params), 3000);
            }
        }

        componentDidUpdate(prevProps) {
            const { load, params } = this.props;
            if (
                load &&
                JSON.stringify(params) !== JSON.stringify(prevProps.params)
            ) {
                console.log("componentDidUpdate", "fetch");
                this.fetch(params);
            }
        }

        fetch(params) {
            this.setState({ loading: true });
            axios({
                method: method,
                url: url,
                params: params
            })
                .then(result => {
                    const parsed = parse ? parse(result.data) : result.data;
                    this.setState({
                        data: parsed,
                        loading: false,
                        load: false
                    });
                })
                .catch(error => {
                    console.log("!!", error);
                    this.setState({
                        loadError: error,
                        loading: false,
                        load: false
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
                    {...this.props}
                />
            );
        }
    };

DataLoader.propTypes = {
    load: PropTypes.bool,
    params: PropTypes.array
};

export default DataLoader;
