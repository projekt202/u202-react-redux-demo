const api_key = '8cab3697a72c5bf2009f16015aa10967';
const api_url = 'https://api.themoviedb.org/3/';
const img_url = 'http://image.tmdb.org/t/p/w500';

function toQueryString(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

export const searchMovies = (query, page=1) =>
    fetch(`${api_url}search/movie?${toQueryString({ api_key, query, page })}`)
        .then(response => response.json());

export const getMovie = (id) => 
    fetch(`${api_url}movie/${id}?${toQueryString({ api_key })}`)
        .then(response => response.json());

export const getImageUrl = path => img_url + path;
