import React, {Component} from 'react';
import axios from 'axios';

export default class GraphSave extends Component {
    constructor(props) {
        super(props);

        this.onChangeGraphDescription = this.onChangeGraphDescription.bind(this);
        this.onChangeGraphTemp = this.onChangeGraphTemp.bind(this);
        this.onChangeGraphTime = this.onChangeGraphTime.bind(this);

        this.state = {
            graph_description: '',
            graph_temp: [],
            graph_time: [],
        }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/graph/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    graph_description: response.data.graph_description,
                    graph_temp: response.data.graph_temp,
                    graph_time: response.data.graph_time
                })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
    }


    onChangeGraphDescription(e) {
        this.setState({
            graph_description: e.target.value
        });
    }

    onChangeGraphTemp(e) {
        this.setState({
            graph_temp: e.target.value
        });
    }

    onChangeGraphTime(e) {
        this.setState({
            graph_time: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <p>{this.state.graph_description}</p>
                <p>{this.state.graph_temp}</p>
                <p>{this.state.graph_time}</p>
            </div>


        );
    }
};
