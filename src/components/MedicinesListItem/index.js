import React from 'react';
import { connect } from 'react-redux';
import { collection } from "../../firebase";
import { openModal } from "../../bus/AddForm/actions";

function MedicinesListItem(props){
    const {data} = props;

    function editModal(id){
        props.dispatch(openModal(id, true));
    }

    function deleteItem(id){
        collection.doc(id).delete()
    }

    return (
        <tr onDoubleClick={editModal.bind(null, data.id)}>
            <th scope="row">{data.code}</th>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td style={{'textAlign': 'right'}}>
                <button className="btn btn-outline-primary btn-sm mr-2"
                        onClick={editModal.bind(null, data.id)}
                >
                    Edit
                </button>
                <button className="btn btn-outline-danger btn-sm"
                        onClick={deleteItem.bind(null, data.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default connect(
    state => ({state}),
    dispatch => ({dispatch})
)(MedicinesListItem);