import React, {Component} from 'react';
import { connect } from 'react-redux';
import MedicinesListItem from "../MedicinesListItem";
import {collection} from "../../firebase";

import {openModal} from "../../bus/AddForm/actions";

class MedicinesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicines: []
        };
    }

    _openAddModal = () => {
        this.props.dispatch(openModal(null,false));
    };

    componentDidMount() {
        collection.onSnapshot((snapshot) => {
            const medicines = snapshot.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));

            this.setState( state => ({
                ...state,
                medicines
            }));
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <table className="table table-sm table-striped table-dark ">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.medicines.map(item => <MedicinesListItem key={item.id} data={item}/>)}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary float-right" onClick={this._openAddModal}>
                    <i className="fa fa-plus"/>
                </button>
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({state}),
    dispatch => ({dispatch})
)(MedicinesList);