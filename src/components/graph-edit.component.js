import React, {Component} from 'react';
import axios from 'axios';

export default class GraphEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeGraphDesc = this.onChangeGraphDesc.bind(this);
        this.onChangeGraphTemp = this.onChangeGraphTemp.bind(this);
        this.onChangeGraphTime = this.onChangeGraphTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            graph_desc: '',
            graph_temp: [],
            graph_time: []
        }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/graph/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    graph_desc: response.data.graph_desc,
                    graph_temp: response.data.graph_temp,
                    graph_time: response.data.graph_time
                })
            }).catch(function (error) {
            console.error((error));
        });
    }


    onChangeGraphDesc(e) {
        this.setState({
            graph_desc: e.target.value
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

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            graph_desc: this.state.graph_desc,
            graph_temp: this.state.graph_temp,
            graph_time: this.state.graph_time,
        };
        axios.post('http://localhost:4000/graph/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        //this.props.history.push('/');
    }

    render() {
        return (

            <div>
                <h3>Update Graph</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>{<label>{this.props.match.params.id}</label>}
                        <input type="text" className="form-control" value={this.state.graph_desc} onChange={this.onChangeGraphDesc}/>
                    </div>
                    <div className="form-group">
                        <label>Temp: </label>
                        <input type="text" className="form-control" value={this.state.graph_temp} onChange={this.onChangeGraphTemp}/>
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input type="text" className="form-control" value={this.state.graph_time} onChange={this.onChangeGraphTime}/>
                    </div>


                    <br/>
                    <hr/>
                    <br/>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Update Graph Details"/>
                    </div>
                </form>
            </div>
        )
    }
}
