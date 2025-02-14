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

 
