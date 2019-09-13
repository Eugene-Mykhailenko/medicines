import {
    OPEN_MODAL,
    CLOSE_MODAL,
    NEXT_STEP,
    PREV_STEP,
    SET_VALUE,
} from './types';

const initialState = {
    show: false,
    step: 1,
    isValidCode: false,
    isValidName: false,
    isValidPrice: false,
    isValidShelfLife: false,
    isValidCompositionAndFormOfRelease: true,
    isValidIndication: true,
    isValidContraIndications: true,
    edit: false,
    id: '',
    code: '',
    name: '',
    price: '',
    shelfLife: '',
    compositionAndFormOfRelease: '',
    indication: '',
    contraIndications: '',
};

export const addFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                show: true,
                id: action.payload.id,
                edit: action.payload.isEdit
            };
        }

        case CLOSE_MODAL: {
            return {
                ...state,
                show: false,
                step: 1,
                edit: action.payload.isEdit
            };
        }

        case NEXT_STEP: {
            return {
                ...state,
                step: state.step + 1

            };
        }

        case PREV_STEP: {
            return {
                ...state,
                step: state.step - 1
            };
        }

        case SET_VALUE: {
            const name = action.payload.name;
            const value = action.payload.value;

            return {
                ...state,
                isValidCode: name === 'code'
                    ? value.length >= 5 && value.length <= 10
                    : state.isValidCode,
                isValidName: name === 'name'
                    ? value.length >= 5 && value.length <= 100
                    : state.isValidName,
                isValidPrice: name === 'price'
                    ? value.length > 0 && Number(value) >= 0.01 && Number(value) <= 1000000
                    : state.isValidPrice,
                isValidShelfLife: name === 'shelfLife'
                    ? value.length > 0 && Number(value) > 0 && Number(value) <= 1000
                    : state.isValidShelfLife,
                isValidCompositionAndFormOfRelease: name === 'compositionAndFormOfRelease'
                    ? value.length >= 0 && value.length <= 2000
                    : state.isValidCompositionAndFormOfRelease,
                isValidIndication: name === 'indication'
                    ? value.length >= 0 && value.length <= 2000
                    : state.isValidIndication,
                isValidContraIndications: name === 'contraIndications'
                    ? value.length >= 0 && value.length <= 2000
                    : state.isValidContraIndications,
                [action.payload.name]: action.payload.value,
            };
        }

        default: {
            return state;
        }
    }
};