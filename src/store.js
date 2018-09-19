import { debounce } from 'lodash';
import { searchMovies } from './TMDb.js';

/**
 * CONSTANTS
 */

// Our Constants define the "types" of actions our reducer expects.
export const CONSTANTS = {
	QUERY_UPDATE: 'QUERY_UPDATE',
	QUERY_SEND: 'QUERY_SEND',
	QUERY_SUCCESS: 'QUERY_SUCCESS',
	QUERY_ERROR: 'QUERY_ERROR',
}

/**
 * ACTION CREATORS
 */

// Action creators make it easier to share actions.

const sendQuery = debounce((searchQuery, dispatch) => {
	
	dispatch({
		type: CONSTANTS.QUERY_SEND
	})
	
	searchMovies(searchQuery)
		.then(({ results }) => {
			dispatch({
				type: CONSTANTS.QUERY_SUCCESS,
				results
			})
		})
		.catch(error => {
			dispatch({
				type: CONSTANTS.QUERY_ERROR,
				error
			})
		})
}, 200)

export const updateQuery = (searchQuery) => (dispatch, getState) => {
	
	dispatch({
		type: CONSTANTS.QUERY_UPDATE,
		searchQuery
	});
	
	sendQuery(searchQuery, dispatch);
}

/**
 * REDUCER
 */

// This defines the shape of our store.
const defaultState = {
	searchQuery: ''
}

// Reducers are just pure functions that take the previous 
// state and an action, and return the next state. 
export const reducer = function(state = defaultState, action) {
	switch(action.type) {
		case CONSTANTS.QUERY_UPDATE:
			return Object.assign({}, state, {
				searchQuery: action.searchQuery
			});
		case CONSTANTS.QUERY_SEND:
			return Object.assign({}, state, {
				loading: true,
				error: null
			});
		case CONSTANTS.QUERY_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				results: action.results
			});
		case CONSTANTS.QUERY_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error
			});
		default: 
			return state;
	}
}