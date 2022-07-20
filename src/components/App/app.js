import React, {Component} from 'react';

import Header from '../header/header';
import SearchPanel from "../search-panel";
import MovieList from "../movie-list";
import Footer from "../footer";

import './app.css'

export default class App extends Component {

    state = {
        movies: [],
    }

    changeTab = (key) => {
        if (key === '2') {
            console.log('hi')
        } else {
            console.log('hello')
        }
    };

    onSearch = (value) => console.log(value);



    render() {

        const movieDate = [
            { id: 1},
            { id: 2},
            { id: 3}
        ];

    return (
        <div className='wrapper'>
            <Header changeTab={this.changeTab} />
            <SearchPanel onSearch={this.onSearch} />
            <MovieList movies={movieDate}/>
            <Footer />
        </div>
    )
}
}