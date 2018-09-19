import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from './TMDb.js';

class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        return (
            <div className="movie-card">
                <div className="movie-card__poster">
                    <img src={getImageUrl(movie.poster_path)} />
                </div>
                <div className="movie-card__content">
                    <h5 className="movie-card__title">{movie.title}</h5>
                    <ul className="movie-card__stats">
                        <li>Released {movie.release_date}</li>
                        <li>Rating {movie.vote_average}</li>
                    </ul>
                    <p>{movie.overview}</p>
                </div>
            </div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
		vote_average: PropTypes.number,
		title: PropTypes.string,
		poster_path: PropTypes.string,
		backdrop_path: PropTypes.string,
		overview: PropTypes.string,
		release_date: PropTypes.string
	})
}

export default MovieCard;
