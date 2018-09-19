import React from 'react';
import { searchMovies } from './TMDb.js';
import MovieCard from './MovieCard.js';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            results: null
        };
    }

    componentDidMount() {
        searchMovies('Star Wars').then(({ results }) => {
            this.setState({ 
                results,
                loading: false 
            });
        });
    }

    render() {
        const { loading, results } = this.state;
        return (
            <div>
                <h2>The Movie Database</h2>
                {loading && (
                    <div className="loading">Loading...</div>
                )}
                {results && results.length && (
                    <MovieCard movie={results[0]} />
                )}
            </div>
        );
    }
}

export default SearchPage;