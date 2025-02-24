import { BASE_URL, API_KEY, options } from "./info.js";

const DEFAULT_MOVIES = 10;

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

const showMovies = async (category = "popular", numMovies = DEFAULT_MOVIES) => {

    const fragment = document.createDocumentFragment();
    const movieList = document.querySelector("#movie-list");
    while (movieList.firstChild) {
        movieList.removeChild(movieList.firstChild);
    }


    await fetch(`${BASE_URL}/${category}?${API_KEY}`, options)
        .then(res => res.json())
        .then(data => {
            const movies = data.results.slice(0, numMovies); // Get the first `numMovies` movies

            movies.forEach(movie => {
                const card = document.querySelector('#movie-card').content.cloneNode(true);
                card.querySelector('h3').innerText = movie.original_title;

                const img = card.querySelector('img');
                img.setAttribute('src', `${IMG_PATH + movie.poster_path}`)
                img.setAttribute('alt', `${movie.original_title}`)

                card.querySelector('.text').innerText = movie.overview;
                card.querySelector('.ogtitle').innerText = movie.original_title;
                card.querySelector(".date").innerText = movie.release_date;

                fragment.append(card);
            });
        })
        .catch(err => console.error(err));

    document.querySelector('#movie-list').append(fragment);
};

// Event listeners for category buttons
document.querySelectorAll("h2").forEach((h2) => {
    h2.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        showMovies(category); // Fetch movies based on clicked category
    });
});

showMovies();

