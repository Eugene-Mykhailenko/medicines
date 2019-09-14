import React, {Component} from 'react';
import {connect} from "react-redux";
import {collection} from "../../firebase";

import {
    closeModal,
    nextStep,
    prevStep,
    setValue,
} from "../../bus/AddForm/actions";

class AddForm extends Component {
    componentDidMount() {
        const {id, edit} = this.props.state.addForm;

        if(!edit) {
            this._clearFields();
        }

        if (edit) {
            collection.doc(id).get().then(doc => {
                if (doc.exists) {
                    this.props.dispatch(setValue('code', doc.data().code));
                    this.props.dispatch(setValue('name', doc.data().name));
                    this.props.dispatch(setValue('price', doc.data().price));
                    this.props.dispatch(setValue('shelfLife', doc.data().shelfLife));
                    this.props.dispatch(setValue('compositionAndFormOfRelease', doc.data().compositionAndFormOfRelease));
                    this.props.dispatch(setValue('indication', doc.data().indication));
                    this.props.dispatch(setValue('contraIndications', doc.data().contraIndications));
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    }

    _closeModal = () => {
        this.props.dispatch(closeModal());
    };

    _handleNextStep = () => {
        this.props.dispatch(nextStep());
    };

    _handlePrevStep = () => {
        this.props.dispatch(prevStep());
    };

    _handleValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'price') {
            const numReg = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');
            if (!numReg.test(value)) return;
        }

        if (name === 'shelfLife') {
            const numReg = new RegExp('^[0-9]*$');
            if (!numReg.test(value)) return
        }

        this.props.dispatch(setValue(name, value));
    };

    _clearFields = () => {
        this.props.dispatch(setValue('code', ''));
        this.props.dispatch(setValue('name', ''));
        this.props.dispatch(setValue('price', ''));
        this.props.dispatch(setValue('shelfLife', ''));
        this.props.dispatch(setValue('compositionAndFormOfRelease', ''));
        this.props.dispatch(setValue('indication', ''));
        this.props.dispatch(setValue('contraIndications', ''));
    };

    _addItem = () => {
        const {
            isValidCode,
            isValidName,
            isValidPrice,
            isValidShelfLife,
            isValidCompositionAndFormOfRelease,
            isValidIndication,
            isValidContraIndications,
            code,
            name,
            price,
            shelfLife,
            compositionAndFormOfRelease,
            indication,
            contraIndications,
        } = this.props.state.addForm;

        if (!isValidCode || !isValidName || !isValidPrice || !isValidShelfLife || !isValidCompositionAndFormOfRelease || !isValidIndication || !isValidContraIndications) return;

        collection.add({
            code,
            name,
            price,
            shelfLife,
            compositionAndFormOfRelease,
            indication,
            contraIndications
        }).then(()=>{
            this.props.dispatch(prevStep());
        });

        this._clearFields();
    };

    _editItem = () => {
        const {
            isValidCode,
            isValidName,
            isValidPrice,
            isValidShelfLife,
            isValidCompositionAndFormOfRelease,
            isValidIndication,
            isValidContraIndications,
            id,
            code,
            name,
            price,
            shelfLife,
            compositionAndFormOfRelease,
            indication,
            contraIndications,
        } = this.props.state.addForm;

        if (!isValidCode || !isValidName || !isValidPrice || !isValidShelfLife || !isValidCompositionAndFormOfRelease || !isValidIndication || !isValidContraIndications) return;

        collection.doc(id).update({
            code,
            name,
            price,
            shelfLife,
            compositionAndFormOfRelease,
            indication,
            contraIndications
        });
        this.props.dispatch(closeModal(false));
    };

    render() {
        const {
            step,
            edit,
            isValidCode,
            isValidName,
            isValidPrice,
            isValidShelfLife,
            isValidCompositionAndFormOfRelease,
            isValidIndication,
            isValidContraIndications,
            code,
            name,
            price,
            shelfLife,
            compositionAndFormOfRelease,
            indication,
            contraIndications
        } = this.props.state.addForm;

        return (
            <React.Fragment>
                <h5 className="mb-4" style={{'textAlign': 'center'}}>
                    {edit ? 'Edit medicine' : 'Add'}{` ${step}/2`}
                </h5>
                <React.Fragment>
                    {step === 1
                        ? <React.Fragment>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Code</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control form-control-sm"
                                           name="code"
                                           value={code}
                                           onChange={this._handleValue}
                                    />
                                    {!isValidCode &&
                                    <div className="text-danger small">введите от 5 до 10 символов</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Name</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control form-control-sm"
                                           name="name"
                                           value={name}
                                           onChange={this._handleValue}
                                    />
                                    {!isValidName &&
                                    <div className="text-danger small">введите от 5 до 100 символов</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Price</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control form-control-sm"
                                           name="price"
                                           value={price}
                                           onChange={this._handleValue}
                                    />
                                    {!isValidPrice &&
                                    <div className="text-danger small">число в диапазоне от 0.01 до 1 000 000</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Expiration date</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control form-control-sm"
                                           name="shelfLife"
                                           value={shelfLife}
                                           onChange={this._handleValue}
                                    />
                                    {!isValidShelfLife && <div className="text-danger small">число от 1 до 1000</div>}
                                </div>
                            </div>
                        </React.Fragment>
                        : <React.Fragment>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label col-form-label-sm">
                                    Composition and releases form
                                </label>
                                <div className="col-sm-9">
                                    <textarea className="form-control form-control-sm"
                                              name="compositionAndFormOfRelease"
                                              value={compositionAndFormOfRelease}
                                              onChange={this._handleValue}
                                              cols="30" rows="5"
                                    />
                                    {!isValidCompositionAndFormOfRelease &&
                                        <div className="text-danger small">строка от 0 до 2000 символов</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label col-form-label-sm">
                                    Indication
                                </label>
                                <div className="col-sm-9">
                                    <textarea className="form-control form-control-sm"
                                              name="indication"
                                              value={indication}
                                              onChange={this._handleValue}
                                              cols="30"
                                              rows="5"
                                    />
                                    {!isValidIndication &&
                                        <div className="text-danger small">строка от 0 до 2000 символов</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label col-form-label-sm">
                                    Contraindications
                                </label>
                                <div className="col-sm-9">
                                    <textarea className="form-control form-control-sm"
                                              name="contraIndications"
                                              value={contraIndications}
                                              onChange={this._handleValue}
                                              cols="30"
                                              rows="5"
                                    />
                                    {!isValidContraIndications &&
                                        <div className="text-danger small">строка от 0 до 2000 символов</div>
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </React.Fragment>
                <button className="btn btn-outline-secondary btn-sm mr-2" onClick={this._closeModal}>Cancel
                </button>
                {step === 1
                    ? <button className="btn btn-outline-primary btn-sm mr-2"
                              onClick={this._handleNextStep}>Next</button>
                    : <button className="btn btn-outline-primary btn-sm mr-2"
                              onClick={this._handlePrevStep}>Prev</button>
                }
                {step === 2 && !edit &&
                <button className="btn btn-outline-success btn-sm" onClick={this._addItem}>Create</button>
                }
                {step === 2 && edit &&
                <button className="btn btn-outline-success btn-sm" onClick={this._editItem}>Edit</button>
                }
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({state}),
    dispatch => ({dispatch})
)(AddForm)