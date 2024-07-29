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
