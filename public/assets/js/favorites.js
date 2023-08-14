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

function toggleFavorite(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const icon = document.getElementById(`icon-${movieId}`);
    if (favorites.includes(movieId)) {
        removeFromFavorites(movieId);
        icon.classList.remove('fas');
        icon.classList.add('far');
    } else {
        addToFavorites(movieId);
        icon.classList.remove('far');
        icon.classList.add('fas');
    }
}

console.log("JS connected!");