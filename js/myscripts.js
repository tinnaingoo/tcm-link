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
                <div class="col-12 col-s-12 col-m-6 col-l-6 col-xl-6">
                <div class="image-container">
                        <img src="${post.imgurl}" alt="Sample Image">
                </div>
                <div class="post-content">
                    <div class="p-title"><a>${post.ptitle}</a></div>
                    <div class="p-description"><a>${post.prescription}</a></div>
                    <div class="p-next"><a href="post.html?post=${post.purl}">Read More &#8811;</a></div>
                </div>
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

});
