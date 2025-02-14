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
