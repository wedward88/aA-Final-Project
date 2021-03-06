import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_USER_EMAIL, CLEAR_ERRORS } from '../../actions/session_actions';
import { RECEIVE_NOTEBOOKS, RECEIVE_ONE_NOTEBOOK, DELETE_NOTEBOOK } from '../../actions/notebook_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {

        case RECEIVE_CURRENT_USER:
            let newState;
            if (state.email){
                newState = merge({}, state)
                delete newState.email
            }
            return merge({}, state, newState, { [action.currentUser.id]: action.currentUser });

        case LOGOUT_CURRENT_USER:
            return {};

        case RECEIVE_USER_EMAIL:
            return merge({}, state, { email: action.email } );

        // case RECEIVE_NOTEBOOKS:
        //         newState = merge({}, state);
        //         Object.values(action.notebooks).forEach((notebook)=> {
        //             newState[notebook.user_id].notebook_ids.push(notebook.id)
        //         })
        //     return newState;

        case RECEIVE_ONE_NOTEBOOK:
                newState = merge({}, state);
                if (!newState[action.notebook.user_id].notebook_ids.includes(action.notebook.id)){
                    newState[action.notebook.user_id].notebook_ids.push(action.notebook.id);
                }
            return newState;

        case DELETE_NOTEBOOK:
                newState = merge({}, state);
                let notebookArr = newState[action.notebook.user_id].notebook_ids;
                let notebookIdx = notebookArr.indexOf(action.notebook.id);
            delete notebookArr[notebookIdx];
            return newState;

        default:
            return state;
    }
}

export default usersReducer;