const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1
  },
  api: {
    apiKey: '567907a51eafa30dd1248a3b501c48c7',
    apiUrl: 'https://api.themoviedb.org/3/'
  }
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
    document.getElementById('popular-movies').appendChild(div);

  });


}

//Display 20 most popular tv shows
const displayPopularTVshows = async () => {
  const results = await fetchApiData('tv/popular');
  const Movies = results.results;
  Movies.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
           <a href="tv-details.html?id=${show.id}">
            ${show.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="Show Title"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${show.name}
            />`
      }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        </div>`;
    console.log(results);
    document.getElementById('popular-shows').appendChild(div);

  });


}

const displayBackgroundImage = async (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

const addCommasToNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3}) + (?!\d))/g, ',');
}

const showAlert = (message, className) => {
  const aleretEl = document.createElement('div');
  aleretEl.classList.add('alert', className);
  aleretEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(aleretEl);

  setTimeout(() => aleretEl.remove(), 2000);
}

//Display movie details
const displayMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchApiData(`movie/${movieId}`);
  console.log(movie)
  const genres = movie.genres;
  console.log(genres)

  //Overlay for backgroudn image
  displayBackgroundImage('movie', movie.backdrop_path)

  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)}
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${genres.map((genre) =>
    `<li>${genre.name}</li>`).join('')
    }
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $ ${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $ ${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} Minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map((company) => `<span>${company.name} ,</span>`).join(' ')}
          </div>
        </div>`

  document.querySelector('#movie-details').appendChild(div);

};

//Display Show details
const displayTvShowDetails = async () => {
  const showId = window.location.search.split('=')[1];

  const tvShow = await fetchApiData(`tv/${showId}`);
  console.log(tvShow)
  const genres = tvShow.genres;
  console.log(genres)

  //Overlay for backgroudn image
  displayBackgroundImage('tv', tvShow.backdrop_path)

  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
              class="card-img-top"
              alt="${tvShow.name}"
            />
          </div>
          <div>
            <h2>${tvShow.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${tvShow.vote_average.toFixed(1)}
            </p>
            <p class="text-muted">Release Date: ${tvShow.last_air_date}</p>
            <p>
              ${tvShow.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${genres.map((genre) =>
    `<li>${genre.name}</li>`).join('')
    }
            </ul>
            <a href="${tvShow.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
             <li><span class="text-secondary">Episodes: </span>${tvShow.seasons.map((season) => `<span>${season.episode_count}</span>`)}</li>
             <li><span class="text-secondary">Status: </span>${tvShow.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${tvShow.production_companies.map((company) => `<span>${company.name} ,</span>`).join(' ')}
          </div>
        </div>`

  document.querySelector('#show-details').appendChild(div);

};

//Display Slider movies
const displaySlider = async () => {
  const { results } = await fetchApiData('movie/now_playing')
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>`;

            document.querySelector('.swiper-wrapper').appendChild(div);

            initSwiper();
  });


}

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });


}

//Search Movies and Shows
const search = async () => {
  const queryString = window.location.search;
  console.log(queryString)

  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if(global.search.term !== '' && global.search.term !== null) {
    // @ todo: make request and display results
    const results = await searchApiData();
    console.log(results);
  } else {
  showAlert("Please enter a search term");
  }
}



//Fetching Data from TMDB API
const fetchApiData = async (endpoint) => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  hideSpinner();

  return data;
}

//Fetching Search api Data
const searchApiData = async (endpoint) => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);

  const data = await response.json();

  hideSpinner();

  return data;
}

const showSpinner = async () => {
  document.querySelector('.spinner').classList.add('show');
}

const hideSpinner = async () => {
  document.querySelector('.spinner').classList.remove('show');
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
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTVshows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayTvShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
