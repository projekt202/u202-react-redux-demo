# U202 React and Redux

Clone this repo.
`https://github.com/projekt202/u202-react-redux-demo.git`

## React

### [1] Getting Started

Let's setup an environment where we can develop some React. Developing easily in React requires a few tools, like Babel and Webpack. 

* [Babel](https://babeljs.io/) is a compiler. React uses the JSX syntax, which let's us write "HTML" in our Javascript.
* [Webpack](https://webpack.js.org/) is our bundler, it's responsible for taking our source code, pulling in dependencies, and optimizing the output.

The React team has provided a tool called `create-react-app` that generates a new app with these tools already configured. It also includes some goodies like live-reload so that the browser reloads when we make changes to our code.

### Install and Run create-react-app

Install [create-react-app](https://github.com/facebook/create-react-app). The `-g` flag means it'll be installed globally on your machine, so you can use it anywhere.

```
npm i create-react-app -g
```

Inside the project directory, let's have create-react-app generate a new React app. The dot `.` parameter tells it to put the app in the current directory. Then let's start it up.

```
create-react-app .
npm start
```

Let's explore some of these generated files...

### JSX

Open **src/App.js**. Here's our first React component. It `extends React.Component`. It has a single function, `render`. 

A few things to note about JSX:

* Since JSX is closer to JavaScript than to HTML, React uses camelCase property naming convention instead of HTML attribute names. For example, `tabindex` becomes `tabIndex`.
* Because `class` is a reserved word in Javascript, `class` becomes `className`.

It looks like magic, but it isn't. Copy the JSX from this `render` function and toss it in the [Babel REPL](https://babeljs.io/en/repl#?presets=es2015%2Creact) to see what it compiles to.

#### Embedding Expressions in JSX

We declare a variable and then use it inside JSX by wrapping it in curly braces. You can put any valid JavaScript expression inside the curly braces in JSX.

```
render() {
	const value = "Hello World";
	return (
		<div>{name}</div>
	);
}
```

You may use curly braces to embed a JavaScript expression in an attribute.

```
render() {
	const value = "Hello World";
	return (
		<input value={value} />
	);
}
```

#### Specifying Children with JSX

If a tag is empty, you may close it immediately with `/>`. JSX tags may contain children.

### Rendering Elements

Open **src/index.js**. `ReactDOM::render` attaches the component to the DOM.

### [2] Props

Let's build something. I've added a simple API to [The Movie Database](https://developers.themoviedb.org/3/). Let's build an interface for searching this database.

Let's start by making a component that can display a movie. The movie object will look something like this...

```
const movie = {
	id: 11,
	vote_average: 8.2,
	title: "Star Wars",
	poster_path: "/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
	backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
	overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
	release_date: "1977-05-25"
}
```

Make a new file **MovieCard.js** that takes a `movie` prop, and renders the following HTML markup. The HTML comments match properties in the movie object. *Note: You'll need to "translate" this to JSX!*

```
<div className="movie-card">
	<div className="movie-card__poster">
		<img src="..." />
	</div>
	<div class="movie-card__content">
		<h5 class="movie-card__title"><!-- title --></h5>
		<ul class="movie-card__stats">
			<li>Released <!-- release_date --></li>
			<li>Rating <!-- vote_average --></li>
		</ul>
		<p><!-- overview --></p>
	</div>
</div>
```

*Discuss the differences between functional components and class components.*

We can render the `MovieCard` component in `App` with some data.

```
<MovieCard movie={movie} />
```

#### Declaring Default Props

You can define default values for your props by assigning to the special `defaultProps` property.

```
MovieCard.defaultProps = {
	movie: {
		title: "Default Title",
		overview: "Default overview."
	}
};
```

Learn more about [default props](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values).

#### Typechecking with PropTypes

React supports runtime typechecking in development mode.

Install [prop-types](https://github.com/facebook/prop-types).

```
npm i prop-types -S
```

```
MovieCard.propTypes = {
	movie: PropTypes.object
	// or
	movie: PropTypes.shape({
		vote_average: PropTypes.number,
		title: PropTypes.string,
		poster_path: PropTypes.string,
		backdrop_path: PropTypes.string,
		overview: PropTypes.string,
		release_date: PropTypes.string
	})
};
```

Learn more about [typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes).

### [3] Component State and Lifecycle

Some components need to manage an internal state. Let's create a new component that lets us search for movies.

1. create a new file **SearchPage.js**
2. import React dependency
3. import TMDb API dependency
4. in `constructor`, let's initialize our `state` to include a `loading` property, defaulted to `true`, and `results: null`
5. in `render`, render a loading state
6. in `componentDidMount`, let's make a call to get some movies, and on return, `setState` `loading` to `false` and save `results`
8. in `render`, *conditionally* render the loading state if loading, otherwise render the first result

Checkout some other lifecycle methods like `componentDidUpdate`. 

Learn more about [the component lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle). You may find this [diagram](https://twitter.com/dan_abramov/status/981712092611989509) useful.

### [4] Lists and Keys

Let's render all the results. You can do this with a simple `for` loop. 

```
let cards = [];
for (let i=0; i<results.length; i++) {
	cards.push(
		<MovieCard movie={results[i]} />
	);
}
return (
	<div>{cards}</div>
)
```

You can do this with `map`.

```
return (
	<div>
		{results && results.map(result => (
			<MovieCard movie={result} />
        ))}
	</div>
);
```

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys.

Learn more about [lists and keys](https://reactjs.org/docs/lists-and-keys.html).

### [5] Event Handling

We've hardcoded the search query. Let's let the user search for movies. Let's add the following markup to our `SearchPage` component. *Note: You'll need to "translate" this to JSX!*

```
<div class="form-row align-items-center my-4">
	<div class="col-auto">
		<input type="text" class="form-control" placeholder="Search for..." />
	</div>
	<div class="col-auto">
		<button type="button" class="btn btn-primary">Search</button>
	</div>
</div>
```

We'll need a way to track the value of our search input. Let's use the `onChange` handler to the `<input>` to manage the current value in `state`.

Once the button is clicked, let's query our movie database. Add an `onClick` handler to the `<button>`.

Learn more about [event handling](https://reactjs.org/docs/handling-events.html).

#### Controlled and Uncontrolled Form Elements

[From the docs...](https://reactjs.org/docs/glossary.html#controlled-vs-uncontrolled-components)

> React has two different approaches to dealing with form inputs.
> 
> An input form element whose value is controlled by React is called a controlled component. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.
> 
> An uncontrolled component works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can’t force the field to have a certain value.
> 
> In most cases you should use controlled components.

Learn more about [controlled](https://reactjs.org/docs/forms.html#controlled-components) and [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html) components.

#### [6][7] Throttling and Debounce

Debounce and throttle are two similar (but different!) techniques to control how many times we allow a function to be executed over time.

Install [Lodash](https://lodash.com/).

```
npm i lodash -S
```

```
import { debounce } from 'lodash';
```

Learn more about [throttling and debouncing techniques](https://css-tricks.com/debouncing-throttling-explained-examples/).

### [8][9] Routing

Install [react-router](https://github.com/ReactTraining/react-router).

```
npm i react-router-dom -S
```

```
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// This renders content conditionally based on the browser's url.
<Router>
	<Route exact path="/" component={Home}/>
	<Route path="/movie/:id" component={MovieDetails}/>
</Router>

// This renders a link that navigates the page to a new url.
<Link to="/">Home</Link>
```

#### [10] Nested Routes

Make a nested route for movie details.

### [11] React Developer Tools

[Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

## Redux

Redux is a predictable state container for JavaScript apps. Learn more about [Redux](https://redux.js.org/).

Install [redux](https://github.com/reduxjs/redux).

```
npm i redux -S
```

### [12] Basic Concepts and API

When state is shared across many components, it's difficult to manage. Things can get out of sync, you may need complex eventing to let components communicate to eachother. 

Instead, what if we had a single source of truth for the state of your app. Imagine your app’s state is described as a plain object. To change something in the state, you need to dispatch an action. An action is a plain JavaScript object that describes what happened.

To try this, let's add some code to our **index.js**.

```
import { createStore } from 'redux';

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
			// state.searchQuery = action.state.searchQuery;
			// return state; 
			
			return Object.assign({}, state, {
				searchQuery: action.searchQuery
			});
		default: 
			return state;
	}
}

// Create the store.
const store = createStore(reducer, /* preloadedState */)
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
```

### [13] Redux Developer Tools

[Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/)

[Usage](https://github.com/zalmoxisus/redux-devtools-extension#usage)

```
const store = createStore(reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
```

### [14] Using React with Redux

Install [react-redux](https://github.com/reduxjs/react-redux).

```
npm i react-redux -S
```

Add Provider to the app. This makes the store accessible by "connected" components down below.

```
<Provider store={store} />
```

Connect the component.

```
import { connect } from 'react-redux';
import { queryMovies } from 'redux'
// ...

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return { 
		queryMovies: (searchQuery) => dispatch(queryMovies(searchQuery)) 
	}
	
	// or
	// return bindActionCreators({ queryMovies }, dispatch);
}

export connect(
	Search,
	state => state, // mapStateToProps
	dispatch => { queryMovies: (arg1) => dispatch(queryMovies(arg1)) }
	
	// or with bindActionCreators
	// dispatch => bindActionCreators({ queryMovies }, dispatch)
);
```

### [15] Async Actions

Install [redux-thunk](https://github.com/reduxjs/redux-thunk).

```
npm i redux-thunk -S
```

In Redux file...

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { searchMovies } from 'TMDb.js';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

const reducer = function(state = defaultState, action) {
	switch(action.type) {
		case CONSTANTS.QUERY_UPDATE:
			// update searchQuery
		case CONSTANTS.QUERY_SEND:	
			// loading true
			// clear error
		case CONSTANTS.QUERY_SUCCESS:
			// loading false
			// set results
		case CONSTANTS.QUERY_ERROR:
			// loading false
			// set error
			return ...
		default: 
			return state;
	}
}

const sendQuery = debounce((dispatch, getState) => {
	
	dispatch({
		type: CONSTANTS.QUERY_SEND
	})
	
	searchMovies()
		.then(movieResults => {
			dispatch({
				type: CONSTANTS.QUERY_SUCCESS,
				movieResults
			})
		})
		.catch(error => {
			dispatch({
				type: CONSTANTS.QUERY_ERROR,
				error
			})
		})
}

const updateQuery = (searchQuery) => (dispatch, getState) => {
	dispatch({
		type: CONSTANTS.QUERY_UPDATE,
		searchQuery
	});
	sendQuery(dispatch, getState);
}
```

## [16] Optimizing Performance

### `shouldComponentUpdate`

Use `shouldComponentUpdate` to let React know if a component’s output is not affected by the current change in state or props.

```
class MovieCard extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.movie !== nextProps.movie;
	}
}
```

In most cases, instead of writing `shouldComponentUpdate` by hand, you can inherit from `React.PureComponent`. It is equivalent to implementing `shouldComponentUpdate` with a shallow comparison of current and previous `props` and `state`.

Learn more about [optimizing performance](https://reactjs.org/docs/optimizing-performance.html).
