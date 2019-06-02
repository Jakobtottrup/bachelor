import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

import axios from 'axios';

export default class GraphProfile extends Component {
    constructor(props) {
        super(props);


        this.onChangeGraphDesc = this.onChangeGraphDesc.bind(this);
        this.onChangeGraphTemp = this.onChangeGraphTemp.bind(this);
        this.onChangeGraphTime = this.onChangeGraphTime.bind(this);
        this.convert = this.convert.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);

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
            }).catch(function (err) {
            console.log(err);
        })

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
        console.log("Profile sent!");
        console.log(this.state.graph_desc);
        console.log(this.state.graph_temp);
        console.log(this.state.graph_time);
        const data = {
            temp: this.state.graph_temp,
            time: this.state.graph_time
        };

        axios.post('http://localhost:4000/graph/display_profile/' + this.props.match.params.id, data)
            .then(res => console.log(res.data));
    }

    convert(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.round(arr[i]);
        }
        return arr;
    }

    render() {
        const data = {
            labels: this.convert(this.state.graph_time)/*this.convert(this.state.graph_time)*/,
            datasets: [
                {
                    label: 'Temperature Profile',
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    /*                    borderColor: 'rgba(75,192,192,1)',
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: 'rgba(75,192,192,1)',
                                        pointBackgroundColor: '#fff',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,*/
                    data: this.state.graph_temp
                }
            ]
        };

        const options = {
            title: {
                display: false,
                text: 'Temperature profile'
            }, scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Elapsed time (minutes)'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Temp'
                    }

                }]
            },
            tooltips: {
                mode: 'nearest',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        };
        return (

            <div className="container">
                <h1>Temperature profile: {this.state.graph_desc}</h1>{/*
                <p>{this.state.graph_temp}</p>
                <p>{this.state.graph_time}</p>*/}
                <Line data={data} options={options}/>

                <div className="" style={{marginTop: 90}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="submit" value="Send profile" className="btn btn-outline-primary"/>
                            <br/> <br/>
                            <p className="text-muted small">Sends the profile to the connected WeMos Device</p>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

};
