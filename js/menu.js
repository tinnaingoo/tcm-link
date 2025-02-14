document.addEventListener("DOMContentLoaded", function() {
    var toggleNav = document.querySelector('.toggle-nav');
    var menuList = document.querySelector('.menu-list');
    var switchElement = document.querySelector('.switch');
    var searchBar = document.getElementById('searchBar');
    var title = document.getElementById('title');
    var searchIcon = document.querySelector('.search-icon');

    if (toggleNav) {
        toggleNav.addEventListener('click', function() {
            menuList.classList.toggle('active');
            toggleNav.classList.toggle('active');
        });
    }

    if (switchElement) {
        switchElement.addEventListener('click', function() {
            if (searchBar.style.display === 'none' || searchBar.style.display === '') {
                searchBar.style.display = 'block';
                title.style.display = 'none';
                searchIcon.src = 'img/close-white.png';
            } else {
                searchBar.style.display = 'none';
                title.style.display = 'block';
                searchIcon.src = 'img/search-white.png';
                searchBar.value = '';
                // Reset the filter
                var postContainers = document.querySelectorAll('.post-container');
                var noResults = document.getElementById('noResults');
                postContainers.forEach(function(container) {
                    container.style.display = '';
                });
                if (noResults) {
                    noResults.style.display = 'none';
                }
            }
        });
    }
});
document.getElementById('searchBar').addEventListener('input', function() {
        var filter = this.value.toLowerCase();
        var postContainers = document.querySelectorAll('.post-container');
        var noResults = document.getElementById('noResults');
        var hasResults = false;
        
        postContainers.forEach(function(container) {
            var title = container.querySelector('.p-title a').textContent.toLowerCase();
            if (title.includes(filter)) {
                container.style.display = '';
                hasResults = true;
            } else {
                container.style.display = 'none';
            }
        });

        if (!hasResults) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    });
});
