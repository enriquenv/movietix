// Check favorites to display icon
function updateIconsFromLocalStorage() {
    const elementsWithAttribute = document.querySelectorAll('[data-element-id]');

    elementsWithAttribute.forEach(element => {
        const elementId = element.getAttribute('data-element-id');
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(elementId)) {
            element.classList.remove('far');
            element.classList.add('fas');
        } else {
            element.classList.remove('fas');
            element.classList.add('far');
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateIconsFromLocalStorage();
    console.log("DOM loaded!");
});

// Add or remove favorites when clicking icon
function addToFavorites(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFromFavorites(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

function toggleFavorite(iconElement) {
    const elementId = iconElement.getAttribute('data-element-id');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(elementId)) {
        removeFromFavorites(elementId);
        iconElement.classList.remove('fas');
        iconElement.classList.add('far');
    } else {
        addToFavorites(elementId);
        iconElement.classList.remove('far');
        iconElement.classList.add('fas');
    }
}

/* // Populate list of favorite movies

function updateFavoriteMovies() {
    fetch('/favorite-movies')
        .then(response => response.json())
        .then(favoriteMovies => {
            const favoritesPlaceholder = document.querySelector('#favorites-placeholder');
            
            favoriteMovies.forEach(movie => {
                const movieElement = createMovieElement(movie);
                favoritesPlaceholder.appendChild(movieElement);
            });
        })
        .catch(error => {
            console.error('Error fetching and updating favorite movies:', error);
        });
}

function createMovieElement(movie) {
    const article = document.createElement('article');
    article.className = 'movie-instance';

    const icon = document.createElement('i');
    icon.className = 'far fa-bookmark';
    icon.onclick = function () {
        toggleFavorite(this);
    };
    icon.setAttribute('data-element-id', movie.id);
    article.appendChild(icon);

    const h3 = document.createElement('h3');
    const a = document.createElement('a');
    a.href = `/detail/${movie.id}`;
    a.textContent = movie.title;
    h3.appendChild(a);
    article.appendChild(h3);

    // Create and append other elements similarly...

    return article;
}

// Call this function to update favorite movies when needed
updateFavoriteMovies(); */


// Populate favorite movies view
function pushFavorites (){
    var movieIDs = JSON.parse(localStorage.getItem('favorites'));
    var promises = movieIDs.map(id => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${ap}&language=en-US`));
    Promise.all(promises)
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(data => {
        // data is an array of movie objects
        data.forEach(movie => {
        // create an article element for each movie
        var article = document.createElement('article');
        // add a class name to the article
        article.className = 'movie-instance';

        // create an i element for toggling favorite
        var i = document.createElement('i');
        // add some attributes and styles to the i
        i.className = 'fas fa-bookmark';
        i.setAttribute('onclick', 'toggleFavorite(this)');
        i.setAttribute('data-element-id', movie.id);

        // create an h3 element for the movie title
        var h3 = document.createElement('h3');
        h3.textContent = movie.title;

        // wrap h3 in an a element with href to detail page
        var a1 = document.createElement('a');
        a1.href = `/detail/${movie.id}`;
        a1.appendChild(h3);

        // if title is different from original title
        if (movie.title != movie.original_title) {
            // create an h4 element for original title
            var h4 = document.createElement('h4');
            h4.textContent = `(${movie.original_title})`;

            // wrap h4 in an a element with same href as before
            var a2 = document.createElement('a');
            a2.href = `/detail/${movie.id}`;
            a2.appendChild(h4);
        }

        // create a div for the overview and read more link
        var overviewDiv = document.createElement('div');

        // create a p element with overview text
        var p = document.createElement('p');
        p.textContent = movie.overview;

        // create an a element with read more text and href
        var a3 = document.createElement('a');
        a3.className = 'read-more';
        a3.textContent = '... Read more.';
        a3.href = `/detail/${movie.id}`;

        // if overview length is greater than or equal to 110
        if (movie.overview.length >= 110) {
            // create a shortened p element
            var shortP = document.createElement('p');
            shortP.textContent = movie.overview.slice(0, 110);

            // wrap shortP in an a element with same href as before
            var a4 = document.createElement('a');
            a4.href = `/detail/${movie.id}`;
            a4.appendChild(shortP);

            // append shortP and a3 elements to the overview div
            overviewDiv.appendChild(shortP);
            overviewDiv.appendChild(a3);
        } else {
            // append p and a3 elements to the overview div
            overviewDiv.appendChild(p);
            overviewDiv.appendChild(a3);
        }

        // create an img element for poster
        var img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
        img.alt = movie.original_title;

        // wrap img in an a element with same href as before
        var a5 = document.createElement('a');
        a5.href = `/detail/${movie.id}`;
        a5.appendChild(img);

        // append the i, a1, a2 (if exists), overviewDiv, and a5 elements to the article element
        article.appendChild(i);
        article.appendChild(a1);
        if (a2) {
            article.appendChild(a2);
        }
        article.appendChild(overviewDiv);
        article.appendChild(a5);

        // append the article element to the section or any other container element
        var section = document.getElementById("favorites-placeholder");
        section.appendChild(article);
    });
    })
    .catch(error => console.log(error));
}


console.log("JS connected!");