document.addEventListener("DOMContentLoaded", function() {
    fetch('posts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        var containerBox = document.getElementById('content');
        
        data.forEach(post => {
            var postContainer = document.createElement('div');
            postContainer.className = 'post-container';
            
            postContainer.innerHTML = `
                <div class="thumbnail"><img src="${post.imgurl}" alt="Thumbnail" style="width:100%;height:100%;border-radius:8px;"></div>
                <div class="post-content">
                    <div class="p-title"><a href="${post.purl}">${post.ptitle}</a></div>
                    <div class="p-description"><a href="${post.purl}">${post.prescription}</a></div>
                    <div class="p-next"><a href="post-page.html?post=${post.purl}">Read More</a></div>
                </div>
            `;
            
            containerBox.appendChild(postContainer);
        });
    })
    .catch(error => console.error('Error loading the posts:', error));

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
