import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateQuery } from './store.js';
import { searchMovies } from './TMDb.js';
import MovieCard from './MovieCard.js';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            results: null
        };
    }

    onInputChange = (e) => {
        const searchQuery = e.target.value;
        this.props.updateQuery(searchQuery);
        this.onSearch(searchQuery);
    }

    onSearch = debounce((searchQuery) => {
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
        const { searchQuery } = this.props;
        const { loading, results } = this.state;
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

SearchPage.propTypes = {
    searchQuery: PropTypes.string,
    updateQuery: PropTypes.func
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateQuery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
