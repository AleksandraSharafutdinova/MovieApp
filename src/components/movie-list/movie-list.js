import React from 'react';
import MovieCard from "../movie-card";
import PropTypes from 'prop-types';

import './movie-list.css';

const MovieList = ({movies, onRatedByStars}) => {

    const elements = movies.map((item) => {

        return (
            <div key={item.id}>
                <MovieCard
                    post={item.poster_path}
                    title={item.title}
                    date={item.release_date}
                    genre={item.genre_ids}
                    overview={item.overview}
                    rate={item.vote_average}
                    movies={movies}
                    id={item.id}
                    ratingStars={item.ratingStars}
                    onRatedByStars={onRatedByStars}
                    />
            </div>
        )
    })

    return (
        <div className="movie-list">
            {elements}
        </div>
    )
}

MovieList.defaultProps = {
    movies: [],
    onRatedByStars: () => {},
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(Object),
    onRatedByStars: PropTypes.func
}

export default MovieList;