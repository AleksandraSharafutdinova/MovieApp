import React, {Component} from 'react';
import { Rate, Tag } from 'antd'

import './movie-card.css'

import Api from "../../services/api";

export default class MovieCard extends Component {

    apiService = new Api();

    state = {
        title: null,
        rate: null,
        overview: null,
        date: null,
        genres: null,
        //post: null, но я хер знает как работать с картинкой
    }

     async getMovieClub() {
        const res = await this.apiService.getFightClub();
        console.log(res)
    }


    onRatedMovies = (value) => {
        console.log(value)
    }

    render() {
        const { title, rate, date, genres, overview} = this.state;
        const {rating} = this.props;

        const filmGenres = (

                        <Tag className="card-genres-tag" >
                            {genres}
                        </Tag>

        );

        return (
            <div className='movie-container' onClick={this.getMovieClub}>
                <img alt='Poster' className='movie-poster' src={`Пока сама тут пищу`} />
                <div className='movie-description'>
                    <div className='flex'>
                        <div className='title'>{title}</div>
                        <div className='genresClass'>
                            <span className='rate'>{rate}</span>
                        </div>
                    </div>
                    <div className='movie-date'>{date}</div>
                    <div className='card-tags'>{filmGenres}</div>
                    <div className='info'>{overview}</div>
                    <Rate className='rate-tab'
                          count={10}
                          //value={rating}
                          onChange={this.onRatedMovies}>
                    </Rate>
                </div>
            </div>
        )
    }
}
