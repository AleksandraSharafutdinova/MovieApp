import React from 'react';
import MovieCard from "../movie-card";

import './movie-list.css';

const MovieList = ({movies, onRatedMovies}) => {

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
                    onRatedMovies={onRatedMovies}
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

export default MovieList;