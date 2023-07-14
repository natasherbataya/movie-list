const TEXT_EMPTY_MESSAGE = 'Добавьте фильм';
const OUTPUT_CLASSNAME = 'output';

const moviesInputNode = document.querySelector('.js-movie__input');
const addBtnNode = document.querySelector('.js-movie__btn');
const listMoviesNode = document.querySelector('.js-movies-list');
const outputNode = document.querySelector('.js-output');


let movies = [];

if (localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));

  movies.forEach(movie => {
    //     const newCssClassLi = movie.viewed ? "movie-item movie-item-checked" : "movie-item";
    //     const newCssClassSpan = movie.viewed ? "viewed__movie viewed__movie-checked" : "viewed__movie";

    //     const listMovies = `
    //   <li id="${movie.id} "data-action="li" class="${newCssClassLi}">
    //   <span data-action="viewed" class="${newCssClassSpan}"></span>
    //   <span data-action="viewed" class="movie__text">${movie.movie}</span>
    //    <button
    //     type="button"
    //     data-action="delete"
    //     class="close__btn">
    //     <img src="resources/close-btn.png" alt="Кнопка закрытия" />
    //   </button>
    // </li>`;

    //     listMoviesNode.insertAdjacentHTML('beforeend', listMovies);
    renderMovies(movie);
  })
};


addBtnNode.addEventListener('click', function () {
  if (!moviesInputNode.value.trim()) {
    outputNode.classList.add(OUTPUT_CLASSNAME);
    clearInput();
    return outputNode.innerText = TEXT_EMPTY_MESSAGE;
  }

  getMovieFromUser();
  saveToLocalStorage();
  clearInput();

});


function getMovieFromUser() {
  const movie = moviesInputNode.value;

  const newMovie = {
    id: Date.now(),
    movie: movie,
    viewed: false,
  };

  saveToLocalStorage();

  movies.push(newMovie);

  //   const newCssClassLi = movie.viewed ? "movie-item movie-item-checked" : "movie-item";
  //   const newCssClassSpan = newMovie.viewed ? "viewed__movie viewed__movie-checked" : "viewed__movie";

  //   const listMovies = `
  //   <li id="${newMovie.id} "data-action="li" class="${newCssClassLi}">
  //   <span data-action="viewed" class="${newCssClassSpan}"></span>
  //   <span data-action="viewed" class="movie__text">${newMovie.movie}</span>

  //    <button
  //     type="button"
  //     data-action="delete"
  //     class="close__btn">
  //     <img src="resources/close-btn.png" alt="Кнопка закрытия" />
  //   </button>
  // </li>`;

  //   listMoviesNode.insertAdjacentHTML('beforeend', listMovies);

  renderMovies(newMovie);

};

function renderMovies(movie) {
  const newCssClassLi = movie.viewed ? "movie-item movie-item-checked" : "movie-item";
  const newCssClassSpan = movie.viewed ? "viewed__movie viewed__movie-checked" : "viewed__movie";

  const listMovies = `
<li id="${movie.id} "data-action="li" class="${newCssClassLi}">
<span data-action="viewed" class="${newCssClassSpan}"></span>
<span data-action="viewed" class="movie__text">${movie.movie}</span></span>

 <button
  type="button"
  data-action="delete"
  class="close__btn">
  <img src="resources/close-btn.png" alt="Кнопка закрытия" />
</button>

</li>`;

  listMoviesNode.insertAdjacentHTML('beforeend', listMovies);
};


function clearInput() {
  moviesInputNode.value = '';
  outputNode.value = '';

};

listMoviesNode.addEventListener('click', function (event) {
  viewedMovies(event);
  deleteMovies(event);
  saveToLocalStorage();
});

function viewedMovies(event) {
  if (event.target.dataset.action !== 'viewed') return

  const parentViewedItem = event.target.closest('.movie-item');
  const id = Number(parentViewedItem.id);

  const movie = movies.find(function (movie) {
    if (movie.id === id) {
      return true
    }
  });

  movie.viewed = !movie.viewed

  parentViewedItem.classList.toggle('movie-item-checked')
  const viewedItem = parentViewedItem.querySelector('.viewed__movie');
  viewedItem.classList.toggle('viewed__movie-checked');

  saveToLocalStorage();

};

function deleteMovies(event) {
  if (event.target.dataset.action === 'delete') {

    const deletedItem = event.target.closest('li');
    const id = Number(deletedItem.id);

    movies = movies.filter(function (movie) {
      if (movie.id !== id) {
        return true
      };
    });

    saveToLocalStorage();
    deletedItem.remove();
  }
};


function saveToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies))
}





























