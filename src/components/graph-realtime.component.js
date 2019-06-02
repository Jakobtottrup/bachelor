import React, {Component} from 'react';
import {Line} from "react-chartjs-2";
import 'chartjs-plugin-streaming';
import axios from "axios";
import moment from 'moment'

moment.locale('da');

let temp_data = [];
let temp_data2 = [];

let time = new moment();
let time_data = [];
let recording = false;

export default class GraphRealtime extends Component {
    constructor(props) {
        super(props);

        this.onSubmitRecord = this.onSubmitRecord.bind(this);
        this.onSubmitStop = this.onSubmitStop.bind(this);
        this.onChangeGraphDesc = this.onChangeGraphDesc.bind(this);
        this.onChangeGraphTemp = this.onChangeGraphTemp.bind(this);
        this.onChangeGraphTime = this.onChangeGraphTime.bind(this);

        this.state = {
            graph_desc: '',
            graph_temp: [],
            graph_time: []
        }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/graph/' + this.props.match.params.id)
            .then(response => {

                this.setState(/*{graph: response.data
                }*/{
                    graph_desc: response.data.graph_desc,
                    graph_temp: response.data.graph_temp,
                    graph_time: response.data.graph_time
                });
            })
            .catch(function (error) {
                console.log(error);
            });
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

    onSubmitRecord(e) {
        e.preventDefault();
        recording = true;
        time = new moment();
        console.log("ID: " + this.props.match.params.id);
        console.log(`Form submitted`);
        console.log(`Graph Description: ${this.state.graph_desc}`);
        console.log(`Graph Temp: ${temp_data2}`);
        console.log(`Graph Time: ${time_data}`);

        this.setState({
            graph_desc: this.state.graph_desc,
            graph_temp: [],
            graph_time: []
        })
    }

    onSubmitStop(e) {
        e.preventDefault();
        recording = false;
    }

    render() {
        let ref = this;
        return (
            <div>
                <Line
                    data={{
                        datasets: [{
                            label: "Temperature",
                            backgroundColor: "rgba(250, 0, 0, 0.4)",
                            fill: true,
                            lineTension: 0.3,
                            gridLines: {
                                display: true,
                                drawTicks: true
                            },
                            data: []
                        }]
                    }}
                    options={{
                        title: {
                            display: false,
                            text: 'Realtime Temperature Data'
                        }, scales: {xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time',
                                }, type: 'realtime',
                                realtime: {
                                    onRefresh: function (chart) {
                                        axios.get('http://localhost:4000/graphdata')
                                            .then(response => {
                                                temp_data = response.data;
                                                let newTime = new moment();

                                                if (recording) {
                                                    time_data.push(moment.duration(newTime.diff(time)).as('minutes'));
                                                    temp_data2.push(response.data.slice(-1)[0]);

                                                    let newGraph = {
                                                        graph_desc: ref.state.graph_desc,
                                                        graph_temp: temp_data2,
                                                        graph_time: time_data
                                                    };
                                                    axios.post('http://localhost:4000/graph/update/' + ref.props.match.params.id, newGraph)
                                                        .then(res => {
                                                            console.log(res.data);
                                                        });
                                                }}).catch(function (error) {
                                                console.log(error);
                                            });

                                        chart.data.datasets.forEach(function (dataset) {

                                            dataset.data.push({

                                                x: new moment(),

                                                y: temp_data.slice(-1)[0]

                                            });

                                        });
                                    },
                                    duration: 600000,
                                    refresh: 30000,
                                    delay: 200,}}], yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Temp'
                                }
                            }]}, tooltips: {
                            mode: 'nearest',
                            intersect: false
                        }, hover: {
                            mode: 'nearest',
                            intersect: false
                        }}}
                />

                <form onSubmit={this.onSubmitRecord}>
                    <div className="form-group">
                        <label>Graph Description: </label>
                        <input type="text" className="form-control" required={true} value={this.state.graph_desc}
                               onChange={this.onChangeGraphDesc}/>
                    </div>
                    {/* <div>
                        <label>{this.props.match.params.id}</label>
                    </div>
                    <div>
                        <label>{this.state.graph_desc}</label>
                    </div>
                    <div>
                        <label>{this.state.graph_temp}</label>
                    </div>
                    <div>
                        <label>{this.state.graph_time}</label>
                    </div>*/}
                    <div className='form-group'>
                        <input type="submit" value="Begin data recording" className="btn btn-primary"/>
                    </div>
                </form>
                <form onSubmit={this.onSubmitStop}>
                    <div className="form-group">
                        <input type="submit" value="Stop recording data" className="btn btn-danger"/>
                    </div>

                </form>

            </div>

        );

    }

}
