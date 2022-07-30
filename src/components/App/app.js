import React, {Component} from 'react';

import SearchPanel from "../search-panel";
import MovieList from "../movie-list";
import Footer from "../footer";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import Api from "../../services/api";
import './app.css'
import { GetGenresProvider } from "../../services/api-services-context";

import { Alert, Tabs } from 'antd';
const { TabPane } = Tabs;

/* eslint-disable no-unused-expressions */
export default class App extends Component {

    apiService = new Api();
    storage = window.localStorage;

    state = {
        movies: [],
        loading: false,
        error: false,
        notification: false,
        currentPage: 1,
        totalPages: null,
        query: null,
        moviesPerPage: 10,
        totalMovies: null,
        ratedByStars: [],
        genres: {},
    }

    onChangingPages = async (curr=1) => {
        window.scrollTo({top: 0})
        this.setState({
            loading: true,
        })
        const movieListPages = await this.apiService.nextPage(this.state.query, curr)
        this.setState(() => ({
            movies: movieListPages.results,
            loading: false,
            totalPages: movieListPages.total_pages,
            totalMovies: movieListPages.total_results,
            query: this.state.query,
            currentPage: curr
        }))
    }

    onRatedByStars = async (id) => {

        const value = this.storage.getItem(id)

        await this.setState(({movies}) => {
            const moviesList = movies.map((el) => {
                const card = {...el}
                if (card.id === id) {
                    if (!card.ratingStars) {
                        card.ratingStars = value
                    }
                }
                this.storage.setItem('movies', JSON.stringify(this.state.movies))
                return card;
            })

            const ratedData = moviesList.filter(el => el.ratingStars);

            return {
                movies: moviesList,
                ratedByStars: ratedData
            }
        })
    }

    onSearch = async (e) => {
        this.setState({
            loading: true
        });
        try {
            const movieList = await this.apiService.getMovie(JSON.stringify(e.target.value));
            const genresRes = await this.apiService.getGenre();
            this.setState(() => ({
                movies: movieList.results,
                loading: false,
                notification: false,
                totalPages: movieList.total_pages,
                totalMovies: movieList.total_results,
                query: e.target.value,
                currentPage: 1,
                genres: genresRes

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

    doReturn = async () => {
        this.setState({
            loading: true
        });
        try {
            const res = await this.apiService.getReturn();
            const genresRes = await this.apiService.getGenre();
            this.setState(() => ({
                movies: res.results,
                loading: false,
                notification: false,
                totalPages: res.total_pages,
                totalMovies: res.total_results,
                currentPage: 1,
                genres: genresRes
            }))
            //console.log(res)
        } catch {
            this.setState({
                error: true,
                loading: false
            })
        }
    }

    componentDidMount() {
        this.doReturn()
    }


    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {

        const {loading, error, movies, notification, ratedByStars} = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorIndicator /> : null;
        const notifications = notification ? <Alert message="Фильм не найден" type="warning" /> : null;

    return (
        <GetGenresProvider value={this.state.genres}>
            <div className='wrapper'>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Search" key="1">
                        <SearchPanel onSearch={this.onSearch} />
                        {spinner}
                        {errorMessage}
                        {notifications}
                        <MovieList movies={movies}
                                   onRatedByStars={this.onRatedByStars}
                        />
                        <Footer onClickPage={this.onChangingPages}
                                moviesPerPage={this.state.moviesPerPage}
                                totalMovies={this.state.totalMovies}
                                />
                    </TabPane>
                    <TabPane tab="Rated" key="2">
                        {spinner}
                        <MovieList movies={ratedByStars}
                                   onRatedByStars={this.onRatedByStars}/>
                    </TabPane>
                </Tabs>
            </div>
        </GetGenresProvider>
    )
    }
}

