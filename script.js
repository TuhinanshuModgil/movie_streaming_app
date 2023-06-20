// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/genre/movie/list';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer d24f41907ce69a889ad7068b159affae'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));


//constants
const apiKey = 'db1c93f3be764232ea2c94613fb41c24';
const apiEndPoint = 'https://api.themoviedb.org/3';

const apiPaths = {
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`
}


//Loading of application
function init()
{
    fetchAndBuildCategories();

}

function fetchAndBuildCategories()
{
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if(Array.isArray(categories)&& categories.length)
        {
            categories.forEach((category)=>
            {
                fetchAndBuildOneCategory(category)
            })

        }

    })
    .catch(err =>console.error(err));
}

function fetchAndBuildOneCategory(categories)
{
    console.log(categories.name ,categories.id);
}


window.addEventListener('load', ()=>{
    init();
})
