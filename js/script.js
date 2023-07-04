const global = {
    currentPage: window.location.pathname
}

const displayPopularMovies = async () => {
    const results = await fetchApiData('movie/popular');
    const Movies = results.results;
    Movies.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
           <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${movie.title}
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>`;
    console.log(results);
        document.getElementById('popular-movies').appendChild(div);
       
    });

    
}


//Fetching Data from TMDB API
const fetchApiData = async (endpoint) => {
    const API_KEY = '567907a51eafa30dd1248a3b501c48c7';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    return data;
}

//Highlight Active Link
const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

//Initialize the App
const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Show');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log("Tv Details");
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
