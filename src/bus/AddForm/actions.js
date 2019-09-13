import {
    OPEN_MODAL,
    CLOSE_MODAL,
    NEXT_STEP,
    PREV_STEP,
    SET_VALUE,
} from "./types";

export const openModal = (id, isEdit = false ) => {
    return {
        type: OPEN_MODAL,
        payload: {id,isEdit}
    }
};

export const closeModal = (isEdit = false) => {
    return {
        type: CLOSE_MODAL,
        payload: isEdit
    }
};

export const nextStep = () => {
    return {
        type: NEXT_STEP
    }
};

export const prevStep = () => {
    return {
        type: PREV_STEP
    }
};
export const setValue = (name,value) => {
    return {
        type: SET_VALUE,
        payload: {name, value}
    }
};
