import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Graph = props => (
    <tr>
        <td>{props.graph._id}</td>
        <td>{props.graph.graph_desc}</td>{/*
        <td>{props.graph.graph_temp}</td>
        <td>{props.graph.graph_time}</td>*/}
        <td>
            <Link to={"/graph/"+props.graph._id}>Record realtime data to graph</Link>
        </td>
        <td>
            <Link to={"/display_profile/"+props.graph._id}>View temperature profile</Link>
        </td>
    </tr>
);


export default class GraphList extends Component {
    constructor(props) {
        super(props);
        this.state = {graph: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/graph')
            .then(response => {
                this.setState({graph: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    graphList() {
        return this.state.graph.map(function (current, index) {
            return <Graph graph={current} key={index} />;

        });
    }
    render() {
        return (
            <div>
                <h3>List of stored Graphs</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>View Realtime</th>
                            <th>View Temperature Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.graphList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
