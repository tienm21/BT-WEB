
export const reducerValidate = (state, action) => {
    switch (action.type) {
        case 'NAME_ERROR':
            return {
                ...state,
                name: {
                    isInValid: true,
                    err: action.msg
                }
            }
        case 'NAME_SUCCESS':
            return {
                ...state,
                name: {
                    isInValid: false,
                    err: ''
                }
            }
        case 'EMAIL_ERROR':
            return {
                ...state,
                email: {
                    isInValid: true,
                    err: action.msg
                }
            }
        case 'EMAIL_SUCCESS':
            return {
                ...state,
                email: {
                    isInValid: false,
                    err: ''
                }
            }
        default:
            console.log('ERROR REDUCER');
            break;
    }
}

export const reducerEdit = (state, action) => {
    switch (action) {
        case 'NAME':
            return {
                ...state,
                nameEdit: !state.nameEdit
            };
        case 'EMAIL':
            return {
                ...state,
                emailEdit: !state.emailEdit
            };
        case 'PASS':
            return {
                ...state,
                matkhauEdit: !state.matkhauEdit
            };

        default:
            break;
    }
}

export function reducerSearch(state, action) {
    switch (action.type) {
        case 'CHANGE_STATE':
            return {
                ...state,
                trangthai: action.payload
            }
        case 'CHANGE_ROLE':
            return {
                ...state,
                role: action.payload
            }
        case 'CHANGE_TEXT':
            return {
                ...state,
                searchtext: action.payload
            }
        default:
            break;
    }
}