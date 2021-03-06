import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

//for Testing
import { retrieveTags, editTag, createTag, deleteTag, retrieveTaggings } from './actions/tag_actions';
// import { signup, login, logout, checkEmail } from './actions/session_actions';
// import { retrieveNotebooks, createNotebook, deleteNotebook } from './actions/notebook_actions';

//end Testing

document.addEventListener('DOMContentLoaded', ()=> {

    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                user: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUserId: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

   
    ReactDOM.render(<Root store={store} />, document.getElementById('root'))

    //for Testing:
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    window.retrieveTags = retrieveTags;
    window.createTag = createTag;
    window.editTag = editTag;
    window.deleteTag = deleteTag;
    window.retrieveTaggings = retrieveTaggings;
    
    // window.login = login;
    // window.signup = signup;
    // window.logout = logout;
    // window.checkEmail = checkEmail;
    // window.retrieveNotebooks = retrieveNotebooks;
    // window.createNotebook = createNotebook;
    // window.deleteNotebook = deleteNotebook;

    // end Testing
});