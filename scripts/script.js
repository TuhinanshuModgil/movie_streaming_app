//constants
const apiKey = "45e53f670e44b4b734f64343ceb02ec3";
const apiEndPoint = "https://api.themoviedb.org/3";
const imageEndPoint = "https://image.tmdb.org/t/p/w500";
const imageEndPoint2 = "https://image.tmdb.org/t/p/original";
// How paths work for reference
// https://api.themoviedb.org/3/genre/movie/list?api_key=b1c93f3be764232ea2c94613fb41c24
// https://image.tmdb.org/t/p/w500/6l1SV3CWkbbe0DcAK1lyOG8aZ4K.jpg?api_key=db1c93f3be764232ea2c94613fb41c24
// https://api.themoviedb.org/3/discover/movie?api_key=db1c93f3be764232ea2c94613fb41c24&with_genre=28
// https://api.themoviedb.org/3/movie/popular?api_key=29596cadb3342347969d2c723a11c4c7

// Object containing all paths to be used
const apiPaths = {
  fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
  fetchCategoryMovies: (genreID) =>
    `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${genreID}`,
  fetchMovieImage: (imagePath) => `${imageEndPoint2}${imagePath}`,
  fetchTrendingMovies: `${apiEndPoint}/movie/popular?api_key=${apiKey}`,
};

//-------------------Loading of application-----------------------

// initialisition function calling APIs and collecting data
function init() {
  fetchAndBuildCategories();
  fetchAndBuildBanner();
}

function fetchAndBuildBanner() {
  fetch(apiPaths.fetchTrendingMovies)
    .then((res) => res.json())
    .then((res) => {
      //console.table(res.results);
      bannerBuilder(res.results);
    })
    .catch((err) => console.error(err));
}

function bannerBuilder(trendingList) {
  const bannerDiv = document.getElementById("banner-container");
  const div = document.createElement("div");
  const bannerContent = trendingList[Math.floor(Math.random() * 20)];
  div.innerHTML = `
  <h1 class="banner-title">${bannerContent.original_title}</h1>
        <p class="banner-discription">
          ${bannerContent.overview}
        </p>
        <div class="banner-buttons">
            <button class="playnow-button">Play Now</button>
            <button class="moreinfo-button">More Info</button>
        </div>
        <div class="side-gradient"></div>`;
  div.className = "banner-container-inner";
  // console.log(bannerimage);
  console.table(trendingList);
  div.style.backgroundImage = `url(${apiPaths.fetchMovieImage(
    bannerContent.backdrop_path
  )})`;

  console.log(div);
  bannerDiv.append(div);
  // apiPaths.fetchMovieImage(trendingList.0.backdrop_path)
}

function fetchAndBuildCategories() {
  fetch(apiPaths.fetchAllCategories)
    .then((res) => res.json()) // gives us obj having genres as one of its properties
    .then((res) => {
      const categories = res.genres; // extracting genres array from the returned onject
      if (Array.isArray(categories) && categories.length) {
        categories.slice(0, 6).forEach((category) => {
          // sending object of genre_name and genre_id
          fetchAndBuildOneCategory(category);
        });
      }
    })
    .catch((err) => console.error(err));
}

function fetchAndBuildOneCategory(categories) {
  console.log(categories.id, categories.name);
  fetch(apiPaths.fetchCategoryMovies(categories.id)) // passing genre_id to fetch to get all movies in that id
    .then((res) => res.json()) // returns an object in which results contains all the movies in that genre
    .then((res) => {
      const moviesInCategory = res.results.slice(0, 6); // we slice first 6 movie info and send to builder
      //console.table(moviesInCategory);
      movieSectionBuilder(moviesInCategory, categories.name);
    })
    .catch((err) => console.log(err));

  // console.log(categories.name ,categories.id);
}

function movieSectionBuilder(moviesInCategory, category_name) {
  const movieGenreSection = document.getElementById("genre-section-area"); // final section where we will add
  //console.table(moviesInCategory);
  const movieImageSection = moviesInCategory
    .map((movie) => {
      return `<div class="individual-movie-container"><img src="${apiPaths.fetchMovieImage(
        movie.backdrop_path
      )}" alt="fast-x" class="genre-movie-img" draggable="false"/><h2>${
        movie.title
      }</h2><h2 id="raiting">${
        movie.vote_average
      } </h2> <a href="https://www.youtube.com/results?search_query=${
        movie.title
      }+trailer" target="_blank">View Youtube</a></div>`;
    })
    .join("");
  const movieSectionHTML = `
    
        <h1>${category_name}</h1>
        <div class="genre-img-section">
        ${movieImageSection}
        </div>
      
    `;
  // console.log(movieSectionHTML);

  const div = document.createElement("div");
  div.className = "genre-name";
  div.innerHTML = movieSectionHTML;
  //console.log(typeof div);

  movieGenreSection.append(div);
}

window.addEventListener("load", () => {
  init();
  addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 5) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer 629ab236ed9996cfaeccab745ef00ed1'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));
