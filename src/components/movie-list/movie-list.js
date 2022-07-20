import React from 'react';
import MovieCard from "../movie-card";

import './movie-list.css';

const MovieList = ({movies}) => {

    const elements = movies.map((item) => {
        return (
            <div key={item.id}>
                <MovieCard />
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