document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'AIzaSyAJj6cUNnF3KFspd69h2hLa-P0YAnbmE2w';
    const blogId = '8069277289488798331';
    const maxPosts = 10; // Number of posts to fetch

    fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=${maxPosts}`)
        .then(response => response.json())
        .then(data => {
            const posts = data.items;
            const blogPostsContainer = document.getElementById('blog-posts');
            blogPostsContainer.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <img src="${post.images ? post.images[0].url : ''}" alt="Post Image">
                    <div>${post.content}</div>
                `;
                blogPostsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching Blogger posts:', error));
});
