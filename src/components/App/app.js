import React, {Component} from 'react';

import Header from '../header/header';
import SearchPanel from "../search-panel";
import MovieList from "../movie-list";
import Footer from "../footer";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import Api from "../../services/api";

import './app.css'

import {Alert} from 'antd';

/* eslint-disable no-unused-expressions */
export default class App extends Component {

    apiService = new Api();

    state = {
        movies: [],
        loading: false,
        error: false,
        notification: false,
        tabPane: '1',
        // Нужно что-то сделать с переключением табсов
        currentPage: 1,
        totalPages: null,
        query: null,
        moviesPerPage: 10,
        totalMovies: null

    }

    onChangingPages = async (curr=1) => {
        //сделать сюда загрузку
        const movieListPages = await this.apiService.nextPage(this.state.query, curr)
        this.setState(() => ({
            movies: movieListPages.results,
            loading: false,
            totalPages: movieListPages.total_pages,
            totalMovies: movieListPages.total_results,
            query: this.state.query,
            currentPage: curr,
        }))
        console.log(movieListPages)
    }

    onRatedMovies = (value) => {
        console.log(value)
    }

    onSearch = async (e) => {
        this.setState({
            loading: true
        });
        try {
            const movieList = await this.apiService.getMovie(JSON.stringify(e.target.value));
            this.setState(() => ({
                movies: movieList.results,
                loading: false,
                notification: false,
                totalPages: movieList.total_pages,
                totalMovies: movieList.total_results,
                query: e.target.value,
                //currentPage: 1

            }))
            if (movieList.total_results === 0) {
                this.onNotification()
            }
        }  catch(e) {
            this.setState({
                error: true,
                loading: false
            })
        }
        //e.target.reset(); с помощью этой штуки можно самоотчистить поле ввода, но я так и не поняла, куда ее пихать
    };

    onNotification = () => {
        this.setState({
            notification: true
        })
    };


    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // changeTab = (key) => {
    //         if (key === '2') {
    //         console.log('2')
    //         } else {
    //         console.log('1')
    //         }
    // }

    // getRatedMovies = () => {
    //     console.log('hello')
    // }


    changeTab = (key) => {
        if (key === '2') {
            this.setState(
                {
                    tabPane: key,
                },
                () => {
                    this.onRatedMovies();
                }
            );
        } else {
            this.setState(
                {
                    tabPane: key,
                },
            );
        }
    };

    render() {

        const {loading, error, movies, notification} = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorIndicator /> : null;
        const notifications = notification ? <Alert message="Фильм не найден" type="warning" /> : null;

    return (
        <div className='wrapper'>
            <Header changeTab={this.changeTab} />
            <SearchPanel onSearch={this.onSearch} />
            {spinner}
            {errorMessage}
            {notifications}
            <MovieList movies={movies}
                       onRatedMovies={this.onRatedMovies}/>
            <Footer onClickPage={this.onChangingPages}
                    moviesPerPage={this.state.moviesPerPage}
                    totalMovies={this.state.totalMovies} />
        </div>
    )
}
}