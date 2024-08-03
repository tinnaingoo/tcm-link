document.addEventListener("DOMContentLoaded", function() {
    // Get the post URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postURL = urlParams.get('post');

    // Redirect to homepage if no post parameter is provided
    if (!postURL) {
        window.location.href = '../index.html';
        return;
    }

    if (postURL) {
        // Fetch the JSON data
        fetch('posts.json')
            .then(response => response.json())
            .then(data => {
                // Find the post with the matching URL
                const post = data.find(p => p.purl === postURL);

                if (post) {
                    // Update the page title
                    document.getElementById('page-title').textContent = post.ptitle;
                    
                    // Update the post title
                    document.getElementById('post-title').textContent = post.ptitle;

                    // Update the post image
                    document.getElementById('post-image').src = post.imgurl;

                    // Update the post content using innerHTML to allow HTML tags
                    document.getElementById('post-content').innerHTML = post.content;

                    // Update the additional information
                    document.getElementById('lince').textContent = post.lince;
                    
                    // Update the operating system with icons
                    const osElement = document.getElementById('os');
                    if (post.os.toLowerCase() === 'windows') {
                        osElement.innerHTML = '<i class="fa fa-windows"></i> Windows';
                    } else if (post.os.toLowerCase() === 'android') {
                        osElement.innerHTML = '<i class="fa fa-android"></i> Android';
                    } else {
                        osElement.textContent = post.os; // Fallback to plain text if OS is unknown
                    }

                    document.getElementById('download-btn').addEventListener('click', function() {
                                window.open(post.dlink, '_blank'); });
                            }
                                })
                                .catch(error => console.error('Error loading the post content:', error));
                            } });


                    document.getElementById('developer').textContent = post.dev;
                    document.getElementById('date').textContent = post.date;
                    document.getElementById('fsize').textContent = post.fsize;
                }
            })
            .catch(error => console.error('Error fetching the post data:', error));
    }
});
