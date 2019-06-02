import React, {Component} from 'react';
import axios from 'axios';

export default class WemosCreate extends Component {

    constructor(props) {
        super(props);

        this.onChangeWemosActive = this.onChangeWemosActive.bind(this);
        this.onChangeWemosDescription = this.onChangeWemosDescription.bind(this);
        this.onChangeWemosOwner = this.onChangeWemosOwner.bind(this);
        this.onChangeWemosId = this.onChangeWemosId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            wemos_description: '',
            wemos_owner: '',
            wemos_id: '',
            wemos_active: false
        }
    }

    onChangeWemosDescription(e) {
        this.setState({
            wemos_description: e.target.value
        })
    }

    onChangeWemosOwner(e) {
        this.setState({
            wemos_owner: e.target.value
        })
    }

    onChangeWemosId(e) {
        this.setState({
            wemos_id: e.target.value
        })
    }

    onChangeWemosActive(e) {
        this.setState({
            wemos_active: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        //TODO: Insert submit logic here!

        console.log(`Form submitted`);
        console.log(`Wemos Description: ${this.state.wemos_description}`);
        console.log(`Wemos Owner: ${this.state.wemos_owner}`);
        console.log(`Wemos ID: ${this.state.wemos_id}`);
        console.log(`Wemos Active? ${this.state.wemos_active}`);

        const newWemos = {
            wemos_description: this.state.wemos_description,
            wemos_owner: this.state.wemos_owner,
            wemos_id: this.state.wemos_id,
            wemos_active: this.state.wemos_active
        };

        axios.post('http://localhost:4000/wemos/add', newWemos)
            .then(res => console.log(res.data));

        this.setState({
            wemos_description: '',
            wemos_owner: '',
            wemos_id: '',
            wemos_active: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Add new Wemos connection</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Wemos Description: </label>
                        <input type="text" className="form-control" value={this.state.wemos_description}
                               onChange={this.onChangeWemosDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Wemos Owner: </label>
                        <input type="text" className="form-control" value={this.state.wemos_owner}
                               onChange={this.onChangeWemosOwner}/>
                    </div>
                    <div className="form-group">
                        <label>Wemos ID: </label>
                        <input type="text" className="form-control" value={this.state.wemos_id}
                               onChange={this.onChangeWemosId}/>
                    </div>
                    {/*<div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="wemosStatus" id="inactive"
                                   value="Inactive" checked={this.state.wemos_active === false}
                                   onChange={this.onChangeWemosActive}/>
                            <label className="form-check-label">Inactive</label>
                            <input style={{marginLeft: 20}} className="form-check-input" type="radio" name="wemosStatus"
                                   id="active"
                                   value="Active" checked={this.state.wemos_active === true}
                                   onChange={this.onChangeWemosActive}/>
                            <label className="form-check-label">Active</label>
                        </div>
                    </div>*/}

                <div className="form-group">
                    <input type="submit" value="Add Wemos Connection" className="btn btn-primary"/>

                </div>
                </form>
            </div>
        )
    }
}
