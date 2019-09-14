import React from 'react';
import { connect } from 'react-redux';
import { collection } from "../../firebase";

import { openModal } from "../../bus/AddForm/actions";

function editModal(props){
    const {data} = props;

    props.dispatch(openModal(data.id, true));
}

function deleteItem(id){
    collection.doc(id).delete()
}

function MedicinesListItem(props){
    const {data} = props;

    return (
        <tr onDoubleClick={editModal.bind(null, props)}>
            <th scope="row">{data.code}</th>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td style={{'textAlign': 'right'}}>
                <button className="btn btn-outline-primary btn-sm m-1"
                        onClick={editModal.bind(null, props)}
                >
                    <i className="fa fa-edit"/>
                </button>
                <button className="btn btn-outline-danger btn-sm m-1"
                        onClick={deleteItem.bind(null, data.id)}
                >
                    <i className="fa fa-trash-alt"/>
                </button>
            </td>
        </tr>
    )
}

export default connect(
    state => ({state}),
    dispatch => ({dispatch})
)(MedicinesListItem);