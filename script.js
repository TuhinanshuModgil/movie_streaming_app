//constants
const apiKey = "29596cadb3342347969d2c723a11c4c7";
const apiEndPoint = "https://api.themoviedb.org/3";
const imageEndPoint = "https://image.tmdb.org/t/p/w500";
// How paths work for reference
// https://api.themoviedb.org/3/genre/movie/list?api_key=b1c93f3be764232ea2c94613fb41c24
// https://image.tmdb.org/t/p/w500/6l1SV3CWkbbe0DcAK1lyOG8aZ4K.jpg?api_key=db1c93f3be764232ea2c94613fb41c24
// https://api.themoviedb.org/3/discover/movie?api_key=db1c93f3be764232ea2c94613fb41c24&with_genre=28

// Object containing all paths to be used
const apiPaths = {
  fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
  fetchCategoryMovies: (genreID) =>
    `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${genreID}`,
  fetchMovieImage: (imagePath) => `${imageEndPoint}${imagePath}`,
};

//-------------------Loading of application-----------------------

// initialisition function calling APIs and collecting data
function init() {
  fetchAndBuildCategories();
}

function fetchAndBuildCategories() {
  fetch(apiPaths.fetchAllCategories)
    .then((res) => res.json())  // gives us obj having genres as one of its properties 
    .then((res) => {
      const categories = res.genres; // extracting genres array from the returned onject
      if (Array.isArray(categories) && categories.length) {
        categories.slice(0, 3).forEach((category) => {   // sending object of genre_name and genre_id
          fetchAndBuildOneCategory(category);
        });
      }
    })
    .catch((err) => console.error(err));
}

function fetchAndBuildOneCategory(categories) {
    console.log(categories.id, categories.name);
  fetch(apiPaths.fetchCategoryMovies(categories.id))  // passing genre_id to fetch to get all movies in that id
    .then((res) => res.json())  // returns an object in which results contains all the movies in that genre
    .then(
      (res) => {
        const moviesInCategory =res.results.slice(0,6) // we slice first 6 movie info and send to builder
        console.table(moviesInCategory); 
        movieSectionBuilder(moviesInCategory ,categories.name)

    }
      
    )
    .catch((err) => console.log(err));

  // console.log(categories.name ,categories.id);
}

function movieSectionBuilder(moviesInCategory, category_name) {

    const movieGenreSection= document.getElementById('genre-section-area'); // final section where we will add
    
    const movieImageSection=moviesInCategory.map((movie)=>{
        return `<img src="${apiPaths.fetchMovieImage(movie.backdrop_path)}" alt="fast-x" class="genre-movie-img"/>`;
    }).join('');
    const movieSectionHTML= `
    
        <h1>${category_name}</h1>
        <div class="genre-img-section">
        ${movieImageSection}
        </div>
      
    `;
    // console.log(movieSectionHTML);

    const div = document.createElement('div');
    div.className='genre-name';
    div.innerHTML = movieSectionHTML;
    console.log(typeof div);

    movieGenreSection.append(div);

        
    
    
}

window.addEventListener("load", () => {
  init();
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