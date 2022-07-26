export default class Api {


    apiBase = 'https://api.themoviedb.org/3/';
    apiKey = 'e2dbf1122383f3ac5d60d7829adf231f';


    async getResource(url, query) {
        const res = await fetch(`${this.apiBase}${url}${this.apiKey}&query=${query}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    async getMovie(query) {
       const res = await this.getResource(`search/movie?api_key=`,query);
       return res;
    };

    async nextPage(query, pageNum) {
        const res = await fetch (`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${query}&page=${pageNum}`);
        return await res.json();
    };

    async getGenre() {
        const res = await fetch(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}`)
        const result = await res.json();
        return result.genres
    };
};







