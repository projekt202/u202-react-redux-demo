import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateQuery } from './store.js';
import MovieCard from './MovieCard.js';

class SearchPage extends React.Component {

    onInputChange = (e) => {
        this.props.updateQuery(e.target.value);
    }

    render() {
        const { loading, results, searchQuery } = this.props;
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
    loading: PropTypes.bool,
    results: PropTypes.array,
    updateQuery: PropTypes.func
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateQuery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
