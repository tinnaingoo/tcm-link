// Check if URL parameters exist, if not redirect to home page
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postUrl = urlParams.get('post');
    
    if (!postUrl) {
        window.location.href = '../index.html'; // Redirect to home page if no post parameter
    } else {
        fetch('../posts.json')
        .then(response => response.json())
        .then(data => {
            const post = data.find(p => p.purl === postUrl);
            if (post) {
                document.getElementById('page-title').textContent = post.ptitle;
                document.getElementById('post-title').textContent = post.ptitle;
                document.getElementById('post-content').innerHTML = post.content; // Use innerHTML instead of innerText
                document.getElementById('post-image').src = post.imgurl;
                document.getElementById('download-btn').addEventListener('click', function() {
                    window.open(post.dlink, '_blank');
                });
            }
        })
        .catch(error => console.error('Error loading the post content:', error));
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var toggleNav = document.querySelector('.toggle-nav');
    var menuList = document.querySelector('.menu-list');
    var switchElement = document.querySelector('.switch');
    var searchBar = document.getElementById('searchBar');
    var title = document.getElementById('title');
    var searchIcon = document.querySelector('.search-icon');

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
