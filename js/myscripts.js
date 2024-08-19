document.addEventListener("DOMContentLoaded", function () {
    const loadingSpinner = document.getElementById('loading');
    const containerBox = document.getElementById('content');
    const categoryDiv = document.getElementById('category');

    let currentLanguage = 'en'; // Default language

    function showLoading() {
        loadingSpinner.style.display = 'block';
    }

    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    function loadPosts(filterCategory = null) {
        showLoading();

        fetch('posts.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                containerBox.innerHTML = '';

                const filteredData = filterCategory 
                    ? data.filter(post => post.category[currentLanguage] === filterCategory) 
                    : data;

                filteredData.forEach(post => {
                    const postContainer = document.createElement('div');
                    postContainer.className = 'post-container';

                    postContainer.innerHTML = `
                        <div class="image-container">
                            <img src="${post.imgurl}" alt="Sample Image">
                        </div>
                        <div class="post-content">
                            <div class="p-title"><a>${post.ptitle[currentLanguage]}</a></div>
                            <div class="p-description"><a>${post.prescription[currentLanguage]}</a></div>
                            <div class="p-next"><a href="post.html?post=${post.purl}">Read More &#8811;</a></div>
                        </div>
                    `;

                    containerBox.appendChild(postContainer);
                });

                // Count posts by category
                const categoryCounts = data.reduce((acc, curr) => {
                    const category = curr.category[currentLanguage];
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});

                // Generate HTML for categories
                let categoryHTML = '<h2>Categories</h2><ul class="category-box">';
                for (const [category, count] of Object.entries(categoryCounts)) {
                    categoryHTML += `<li class="category-tag" data-category="${category}">${category} (${count})</li>`;
                }
                categoryHTML += '</ul>';
                categoryDiv.innerHTML = categoryHTML;

                // Add event listeners to category tags
                const categoryTags = document.querySelectorAll('.category-tag');
                categoryTags.forEach(tag => {
                    tag.addEventListener('click', function () {
                        const selectedCategory = this.getAttribute('data-category');
                        loadPosts(selectedCategory);
                    });
                });

                hideLoading();
            })
            .catch(error => {
                console.error('Error loading the posts:', error);
                hideLoading();
            });
    }

    // Event listener for language change
    document.getElementById('languageSelector').addEventListener('change', function () {
        currentLanguage = this.value;
        loadPosts(); // Reload posts with the new language
    });

    // Initial load
    loadPosts();

    // Search functionality
    document.getElementById('searchBar').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        const postContainers = document.querySelectorAll('.post-container');
        const noResults = document.getElementById('noResults');
        let hasResults = false;

        postContainers.forEach(function (container) {
            const title = container.querySelector('.p-title a').textContent.toLowerCase();
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
