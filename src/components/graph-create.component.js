import React, {Component} from 'react';
import axios from 'axios';


export default class GraphCreate extends Component {

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

    onChangeGraphDesc(e) {
        this.setState({
            graph_desc: e.target.value
        })
    }

    onChangeGraphTemp(e) {
        this.setState({
            graph_temp: e.target.value
        })
    }

    onChangeGraphTime(e) {
        this.setState({
            graph_time: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        console.log(`Form submitted`);
        console.log(`Description: ${this.state.graph_desc}`);
        console.log(`Temp: ${this.state.graph_temp}`);
        console.log(`Time: ${this.state.graph_time}`);

        const newGraph = {
            graph_desc: this.state.graph_desc,
            graph_temp: this.state.graph_temp,
            graph_time: this.state.graph_time
        };

        axios.post('http://localhost:4000/graph/record', newGraph)
            .then(res => console.log(res.data));

        this.setState({
            graph_desc: '',
            graph_temp: [],
            graph_time: []
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Add new Graph connection</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Graph Description: </label>
                        <input type="text" className="form-control" value={this.state.graph_desc}
                               onChange={this.onChangeGraphDesc}/>
                    </div>
                   {/* <div className="form-group">
                        <label>Graph Temp: </label>
                        <input type="text" className="form-control" value={this.state.graph_temp}
                               onChange={this.onChangeGraphTemp}/>
                    </div>
                    <div className="form-group">
                        <label>Graph Time: </label>
                        <input type="text" className="form-control" value={this.state.graph_time}
                               onChange={this.onChangeGraphTime}/>
                    </div>*/}

                <div className="form-group">
                    <input type="submit" value="Add Graph Connection" className="btn btn-primary"/>

                </div>
                </form>
            </div>
        )
    }
}
