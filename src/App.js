import React, {Component} from 'react';

import 'chartjs-plugin-streaming';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import GraphRealtime from "./components/graph-realtime.component";
import GraphCreate from "./components/graph-create.component";
import GraphEdit from "./components/graph-edit.component";
import GraphList from "./components/graph-list.component";
import GraphProfile from "./components/graph-profile";




class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand">Home</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                                aria-expanded="false" aria-label="Toggle navigation"><span
                            className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                            <ul className="navbar-nav mr-auto">{/*
                                <li className="nav-item">
                                    <Link to="/graph" className="nav-link">Realtime Data</Link>
                                </li>*/}
                                <li className="nav-item">
                                    <Link to="/create" className="nav-link">Add Graph Connection</Link>
                                </li>{/*
                                <li className="nav-item">
                                    <Link to="/edit/:id" className="nav-link">Edit Wemos Connection</Link>
                                </li>*/}
                            </ul>
                        </div>

                    </nav>

                    <Route path="/" exact component={GraphList}/>
                    <Route path="/edit/:id" component={GraphEdit}/>
                    <Route path="/create" component={GraphCreate}/>
                    <Route path="/graph/:id" component={GraphRealtime}/>
                    <Route path="/display_profile/:id" component={GraphProfile}></Route>


                </div>


            </Router>
        );
    }
}

export default App;
