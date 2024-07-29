    document.addEventListener("DOMContentLoaded", function() {
        // Extract query parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const postUrl = urlParams.get('post');

        if (postUrl) {
            fetch('posts.json')
            .then(response => response.json())
            .then(data => {
                const post = data.find(p => p.purl === postUrl);
                if (post) {
                    document.getElementById('page-title').textContent = post.ptitle;
                    document.getElementById('post-title').textContent = post.ptitle;
                    document.getElementById('post-image').src = post.imgurl;
                    document.getElementById('post-content').textContent = post.content;
                    document.getElementById('lince').textContent = post.lince;
                    document.getElementById('os').textContent = post.os;
                    document.getElementById('developer').textContent = post.dev;
                    document.getElementById('date').textContent = post.date;
                    document.getElementById('fsize').textContent = post.fsize;
                } else {
                    document.getElementById('post-title').textContent = 'Post not found';
                }
            })
            .catch(error => console.error('Error loading the post:', error));
        } else {
            document.getElementById('post-title').textContent = 'No post specified';
        }
    });
