import React from 'react';
import { Link } from 'react-router-dom';
import { getMovie, getImageUrl } from './TMDb.js';

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            movieDetails: null,
            loading: true
        }
    }

    componentDidMount() {
        getMovie(this.props.match.params.id).then(movieDetails => {
            this.setState({ 
                movieDetails, 
                loading: false 
            })
        })
    }

    render() {
        const { loading, movieDetails } = this.state;
        return (
            <div>
                <div className="my-2">
                    <Link to="/">← Back to Search</Link>
                </div>
                {loading && "Loading..."}
                {movieDetails && (
                    <div className="movie-details">
                        <img src={getImageUrl(movieDetails.poster_path)} />
                        <div className="movie-details__content">
                            <h2>{movieDetails.title}</h2>
                            {movieDetails.tagline && (
                                <h5>{movieDetails.tagline}</h5>
                            )}
                            <p>
                                {movieDetails.genres.map(genre => (
                                    <span key={genre.id} className="badge badge-pill badge-primary">{genre.name}</span>
                                ))}
                            </p>
                            <dl className="row">
                                <dt className="col-sm-3">Release Date</dt>
                                <dd className="col-sm-9">{movieDetails.release_date || 'NA'}</dd>
                                <dt className="col-sm-3">Runtime</dt>
                                <dd className="col-sm-9">{movieDetails.runtime + ' minutes' || 'NA'}</dd>
                                <dt className="col-sm-3">Rating</dt>
                                <dd className="col-sm-9">{movieDetails.vote_average || 'NA'}</dd>
                            </dl>
                            <p>{movieDetails.overview}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default MovieDetails;