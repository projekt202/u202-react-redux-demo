import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




// This defines the shape of our store.
const defaultState = {
	searchQuery: ''
}

// Our Constants define the "types" of actions our reducer expects.
const CONSTANTS = {
	QUERY_UPDATE: 'QUERY_UPDATE'
}

// Reducers are just pure functions that take the previous 
// state and an action, and return the next state. 
const reducer = function(state = defaultState, action) {
	switch(action.type) {
		case CONSTANTS.QUERY_UPDATE:
			return Object.assign({}, state, {
				searchQuery: action.searchQuery
			});
		default: 
			return state;
	}
}

// Create the store.
const store = createStore(reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log(store.getState())

// We "dispatch" actions to the store.
store.dispatch({
	type: CONSTANTS.QUERY_UPDATE,
	searchQuery: 'a'
})
console.log(store.getState())

// Action creators make it simpler to share actions.
const updateQuery = searchQuery => ({
	type: CONSTANTS.QUERY_UPDATE,
	searchQuery
})

store.dispatch(updateQuery('aa'))
console.log(store.getState())

// You can listen to changes in the store like this.
store.subscribe(() => console.log('subscribed', store.getState()))
store.dispatch(updateQuery('x'))
store.dispatch(updateQuery('y'))
store.dispatch(updateQuery('z'))
