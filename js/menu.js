document.querySelector('.toggle-nav').addEventListener('click', function() {
        document.querySelector('.menu-list').classList.toggle('active');
    });

    document.querySelector('.switch').addEventListener('click', function() {
        var searchBar = document.getElementById('searchBar');
        var title = document.getElementById('title');
        var searchIcon = document.querySelector('.search-icon');

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
            noResults.style.display = 'none';
        }
    });
});
