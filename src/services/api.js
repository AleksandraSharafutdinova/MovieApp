export default class Api {


    apiBase = 'https://api.themoviedb.org/3/';
    apiKey = 'e2dbf1122383f3ac5d60d7829adf231f';


    async getResource(url) {
        const res = await fetch(`${this.apiBase}${url}${this.apiKey}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }

    async getFightClub() {
        const res = await this.getResource(`movie/550?api_key=`);
        return res;
    }
}


// const swapi = new Api();
//  swapi.getFightClub().then((body) => {
//     console.log(body.overview);
//  });





