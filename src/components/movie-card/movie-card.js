import React, {Component} from 'react';
import { Rate, Tag } from 'antd';
import {format} from "date-fns";

import './movie-card.css'

export default class MovieCard extends Component {

    getDate = (dateRelease) => {
        if (dateRelease === null || dateRelease === "" || dateRelease === undefined) {
            return 'Movie id is old'
        }
        const res = format(new Date(dateRelease), 'MMMM dd, yyyy');
        return res;
    }

    render() {
        const { title, rate, date, overview, post, onRatedMovies} = this.props;

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
        // От 0 до 3 - #E90000 bad
        // От 3 до 5 - #E97E00 normal
        // От 5 до 7 - #E9D100 better
        // Выше 7 - #66E900 great

        let classNames = 'rate';
        if (rate <= 3) {
            classNames += ' bad'
        } else if (rate > 3 && rate < 5) {
            classNames += ' normal'
        } else if (rate >= 5 && rate < 7) {
            classNames += ' better'
        } else if (rate >= 7) {
            classNames += ' great'
        }


        return (
            <div className='movie-container'>
                <img alt='Poster' className='movie-poster' src={`https://image.tmdb.org/t/p/original${post}`} />
                <div className='movie-description'>
                    <div className='flex'>
                        <div className='title'>{title}</div>
                        <span className={classNames}>{rate}</span>
                    </div>
                    <div className='movie-date'>{this.getDate(date)}</div>
                    <div className='card-tags'>
                        {filmGenres}
                    </div>
                    <div className='info'>{overview}</div>
                    <Rate className='rate-tab'
                          count={10}
                          onChange={onRatedMovies} >
                    </Rate>
                </div>
            </div>
        )
    }
}
