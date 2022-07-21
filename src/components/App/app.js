import React, {Component} from 'react';

import Header from '../header/header';
import SearchPanel from "../search-panel";
import MovieList from "../movie-list";
import Footer from "../footer";
import Spinner from "../spinner";
import errorIndicator from "../error-indicator";

import './app.css'

export default class App extends Component {

    state = {
        movies: [],
        loading: true,
        error: false,
    }

    changeTab = (key) => {
        if (key === '2') {
            console.log('hi')
        } else {
            console.log('hello')
        }
    };

    onSearch = (value) => console.log(value);

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    } // обрабатывает ошибки?????


    render() {

        const {loading, error} = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <errorIndicator /> : null;

        const movieDate = [
            { id: 1},
            { id: 2},
            { id: 3}
        ];

    return (
        <div className='wrapper'>
            <Header changeTab={this.changeTab} />
            <SearchPanel onSearch={this.onSearch} />
            {spinner}
            {errorMessage}
            <MovieList movies={movieDate}/>
            <Footer />
        </div>
    )
}
}