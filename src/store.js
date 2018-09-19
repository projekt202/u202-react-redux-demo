/**
 * CONSTANTS
 */

// Our Constants define the "types" of actions our reducer expects.
export const CONSTANTS = {
	QUERY_UPDATE: 'QUERY_UPDATE'
}

/**
 * ACTION CREATORS
 */

// Action creators make it easier to share actions.
export const updateQuery = searchQuery => ({
	type: CONSTANTS.QUERY_UPDATE,
	searchQuery
})

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
		default: 
			return state;
	}
}