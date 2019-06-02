import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Wemos = props => (
    <tr>
        <td className={props.wemos.wemos_active ? '' : "text-danger"}>{props.wemos.wemos_description}</td>
        <td className={props.wemos.wemos_active ? '' : "text-danger"}>{props.wemos.wemos_owner}</td>
        <td className={props.wemos.wemos_active ? '' : "text-danger"}>{props.wemos.wemos_id}</td>
{/*
        <td>{props.wemos.wemos_active}</td>
*/}
        <td>
            <Link to={"/edit/"+props.wemos._id}>Edit</Link>
        </td>
    </tr>
);


export default class WemosList extends Component {
    constructor(props) {
        super(props);
        this.state = {wemos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/wemos')
            .then(response => {
                this.setState({wemos: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /*componentDidUpdate() {
        axios.get('http://localhost:4000/wemos')
            .then(response => {
                this.setState({wemos: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }*/
    wemosList() {
        return this.state.wemos.map(function (currentWemos, index) {
            return <Wemos wemos={currentWemos} key={index} />;

        });
    }
    render() {
        return (
            <div>
                <h3>List of stored Wemos Devices</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Owner</th>
                            <th>ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.wemosList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
