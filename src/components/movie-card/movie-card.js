import React, {Component} from 'react';
import { Rate, Tag } from 'antd';
import {format} from "date-fns";

import './movie-card.css'

import Api from "../../services/api";

export default class MovieCard extends Component {

    apiService = new Api();

    state = {
        title: null,
        rate: null,
        overview: null,
        date: null,
        post: null,
    }

    constructor() {
        super();
        this.updateMovie()
    }

    // updateMovie() {
    //     const res = this.apiService.getMovie('lol')
    //     console.log(res)
    // }

    updateMovie() {
        this.apiService.getMovie('lol').then((movie) => {
            this.setState({
                title: movie.original_title,
                // overview: movie.overview,
                // rate: movie.vote_average,
                // date: movie.release_date,
                // post: movie.poster_path,
            })
        })
    }

    onRatedMovies = (value) => {
        console.log(value)
    }

    getDate = (dateRelease) => {
        if (dateRelease === null || dateRelease === "" || dateRelease === undefined) {
            return 'Movie id is old'
        }
        const res = format(new Date(dateRelease), 'MMMM dd, yyyy');
        return res;
    }

    render() {
        const { title, rate, date, overview, post} = this.state;

        const filmGenres = (
            <div>
                <Tag className="card-genres-tag" >
                    Жанр
                </Tag>
                <Tag className="card-genres-tag" >
                    Ужасы
                </Tag>
                <Tag className="card-genres-tag" >
                    Триллер
                </Tag>
            </div>
        );




        return (
            <div className='movie-container'>
                <img alt='Poster' className='movie-poster' src={`https://image.tmdb.org/t/p/original${post}`} />
                <div className='movie-description'>
                    <div className='flex'>
                        <div className='title'>{title}</div>
                        <div className='genresClass'>
                            <span className='rate'>{rate}</span>
                        </div>
                    </div>
                    <div className='movie-date'>{this.getDate(date)}</div>
                    <div className='card-tags'>
                        {filmGenres}
                    </div>
                    <div className='info'>{overview}</div>
                    <Rate className='rate-tab'
                          count={10}
                          onChange={this.onRatedMovies}>
                    </Rate>
                </div>
            </div>
        )
    }
}
