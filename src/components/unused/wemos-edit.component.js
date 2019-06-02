import React, {Component} from 'react';
import axios from 'axios';

export default class WemosEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeWemosDescription = this.onChangeWemosDescription.bind(this);
        this.onChangeWemosOwner = this.onChangeWemosOwner.bind(this);
        this.onChangeWemosId = this.onChangeWemosId.bind(this);
        this.onChangeWemosActive = this.onChangeWemosActive.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            wemos_description: '',
            wemos_owner: '',
            wemos_id: '',
            wemos_active: false
        }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/wemos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    wemos_description: response.data.wemos_description,
                    wemos_owner: response.data.wemos_owner,
                    wemos_id: response.data.wemos_id,
                    wemos_active: response.data.wemos_active
                })
            }).catch(function (error) {
            console.error((error));
        });
    }


    onChangeWemosDescription(e) {
        this.setState({
            wemos_description: e.target.value
        });
    }

    onChangeWemosOwner(e) {
        this.setState({
            wemos_owner: e.target.value
        });
    }

    onChangeWemosId(e) {
        this.setState({
            wemos_id: e.target.value
        });
    }

    onChangeWemosActive(e) {
        this.setState({
            wemos_active: !this.state.wemos_active
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            wemos_description: this.state.wemos_description,
            wemos_owner: this.state.wemos_owner,
            wemos_id: this.state.wemos_id,
            wemos_active: this.state.wemos_active
        };
        axios.post('http://localhost:4000/wemos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }

    render() {
        return (

            <div>
                <h3>Update Wemos</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" className="form-control" value={this.state.wemos_description} onChange={this.onChangeWemosDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Owner: </label>
                        <input type="text" className="form-control" value={this.state.wemos_owner} onChange={this.onChangeWemosOwner}/>
                    </div>
                    <div className="form-group">
                        <label>Id: </label>
                        <input type="text" className="form-control" value={this.state.wemos_id} onChange={this.onChangeWemosId}/>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="activeCheckbox" name="activeCheckbox" onChange={this.onChangeWemosActive} checked={this.state.wemos_active} value={this.state.wemos_active}/>
                        <label className="form-check-label" htmlFor="activeCheckbox">Active</label>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Update Wemos Details"/>
                    </div>
                </form>
            </div>
        )
    }
}
