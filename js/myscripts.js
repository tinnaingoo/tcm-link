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
      
      // Create post containers with a data attribute for category
      data.forEach(post => {
        var postContainer = document.createElement('div');
        postContainer.className = 'post-container';
        postContainer.setAttribute('data-category', post.category);
        
        postContainer.innerHTML = `
          <div class="image-container">
              <img src="${post.imgurl}" alt="Sample Image">
          </div>
          <div class="post-content">
              <div class="p-title"><a>${post.ptitle}</a></div>
              <div class="p-description"><a>${post.prescription}</a></div>
              <div class="p-next"><a href="post.html?post=${post.purl}">Read More &#8811;</a></div>
          </div>
        `;
        
        containerBox.appendChild(postContainer);
      });

      // Count posts by category (for sidebar display)
      const categoryCounts = data.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
      }, {});

      // Generate HTML for categories in sidebar
      const categoryDiv = document.getElementById('category');
      let categoryHTML = '<h2>Categories</h2><ul class="category-box">';
      for (const [cat, count] of Object.entries(categoryCounts)) {
        categoryHTML += `<li class="category-tag">${cat} (${count})</li>`;
      }
      categoryHTML += '</ul>';
      categoryDiv.innerHTML = categoryHTML;

      // Function to filter posts based on category
      function filterPosts(category) {
        var postContainers = document.querySelectorAll('.post-container');
        postContainers.forEach(function(container) {
          // "all" ဆိုရင်အားလုံး ပြရန်
          if (category === 'all' || container.getAttribute('data-category') === category) {
            container.style.display = '';
          } else {
            container.style.display = 'none';
          }
        });
      }

      // Function to update active class on menu items
      function setActiveMenu(activeId) {
        var menuItems = document.querySelectorAll('.menu-list li');
        menuItems.forEach(function(item) {
          if (item.id === activeId) {
            item.querySelector('a').classList.add('active');
          } else {
            item.querySelector('a').classList.remove('active');
          }
        });
      }

      // Attach event listeners to menu items
      document.getElementById('menu-all').addEventListener('click', function() {
        filterPosts('all');
        setActiveMenu('menu-all');
      });
      document.getElementById('menu-computer').addEventListener('click', function() {
        filterPosts('Computer');
        setActiveMenu('menu-computer');
      });
      document.getElementById('menu-android').addEventListener('click', function() {
        filterPosts('Android');
        setActiveMenu('menu-android');
      });
      document.getElementById('menu-ebook').addEventListener('click', function() {
        filterPosts('Ebook');
        setActiveMenu('menu-ebook');
      });
      document.getElementById('menu-technology').addEventListener('click', function() {
        filterPosts('Technology');
        setActiveMenu('menu-technology');
      });

    })
    .catch(error => console.error('Error loading the posts:', error));

  // Existing search functionality: filter by post title
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
