import React from 'react';
import {connect} from 'react-redux';

import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'

import MedicinesList from './components/MedicinesList';
import AddForm from "./components/AddForm";

import { closeModal } from "./bus/AddForm/actions";

function handleCloseModal(props){
    props.dispatch(closeModal())
}

function App(props) {
    return (
        <div className="container-fluid">
            <MedicinesList/>
            <Modal show={props.state.addForm.show} onHide={handleCloseModal.bind(null, props)}>
                <Modal.Body>
                    <AddForm/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default connect(
    state => ({state}),
    dispatch => ({dispatch})
)(App);
