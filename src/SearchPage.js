import React from 'react';
import { searchMovies } from './TMDb.js';
import MovieCard from './MovieCard.js';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            results: null,
            searchQuery: ''
        };
    }

    onInputChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    }

    onButtonClick = (e) => {
        if (this.state.searchQuery.length > 0) {
            this.setState({
                loading: true
            });
            searchMovies(this.state.searchQuery).then(({ results }) => {
                this.setState({ 
                    results,
                    loading: false 
                });
            });
        }
    }

    render() {
        const { loading, results } = this.state;
        return (
            <div>
                <h2>The Movie Database</h2>

                <div className="form-row align-items-center my-4">
                    <div className="col-auto">
                        <input type="text" className="form-control" placeholder="Search for..." onChange={this.onInputChange} />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={this.onButtonClick}>Search</button>
                    </div>
                </div>

                {loading && (
                    <div className="loading">Loading...</div>
                )}
                {results && results.map(result => (
			        <MovieCard key={result.id} movie={result} />
                ))}
            </div>
        );
    }
}

export default SearchPage;