import React, {Component} from 'react';
import { Rate, Tag } from 'antd';
import {format} from "date-fns";
import PropTypes from 'prop-types';
import { GetGenresConsumer } from "../../services/api-services-context";

import './movie-card.css'

export default class MovieCard extends Component {

    getDate = (dateRelease) => {
        if (dateRelease === null || dateRelease === "" || dateRelease === undefined) {
            return 'Movie id is old'
        }
        const res = format(new Date(dateRelease), 'MMMM dd, yyyy');
        return res;
    }

    onRatedMovies = (value) => {
        localStorage.setItem(this.props.id, JSON.stringify(value))
        this.props.onRatedByStars(this.props.id)
    }

    getGenre = (arr, num) => {
        const res2 = arr.filter(el => num.includes(el.id));
        const res3 = res2.map(elem => elem.name)
        return res3.join(', ')
    }

    render() {
        const { title, rate, date, overview, post, genre} = this.props;



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
                        <GetGenresConsumer>
                            {value =>
                                <Tag>
                                    {this.getGenre(value, genre)}
                                </Tag>
                            }
                        </GetGenresConsumer>
                    </div>
                    <div className='info'>{overview}</div>
                    <Rate className='rate-tab'
                          count={10}
                          onChange={this.onRatedMovies} >
                    </Rate>
                </div>
            </div>
        )
    }
}


MovieCard.defaultProps = {
    post: '',
    title: '',
    rate: 0,
    genre: [],
    overview: '',
    id: 0,
    date: '',
}

MovieCard.propTypes = {
    post: PropTypes.string,
    title: PropTypes.string,
    rate: PropTypes.number,
    genre: PropTypes.arrayOf(Object),
    overview: PropTypes.string,
    id: PropTypes.number,
    date: PropTypes.string,
}