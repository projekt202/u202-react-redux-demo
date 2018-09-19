import React, { Component } from 'react';

import MovieCard from './MovieCard.js';
import './App.css';

const movie = {
	id: 11,
	vote_average: 8.2,
	title: "Star Wars",
	poster_path: "/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
	backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
	overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
	release_date: "1977-05-25"
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <MovieCard movie={movie} />
      </div>
    );
  }
}

export default App;
