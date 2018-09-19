import React from 'react';
import { debounce } from 'lodash';
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
        this.onSearch();
    }

    onSearch = debounce(() => {
        const { searchQuery } = this.state;
        if (searchQuery.length > 0) {
            
            this.setState({
                loading: true
            });
            
            searchMovies(searchQuery).then(({ results }) => {
                this.setState({ 
                    results,
                    loading: false 
                });
            });
        }
    }, 200)

    render() {
        const { loading, results, searchQuery } = this.state;
        return (
            <div>
                <h2>The Movie Database</h2>

                <div className="form-group">
                    <input type="text" value={searchQuery} className="form-control" placeholder="Search for..." onChange={this.onInputChange} />
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