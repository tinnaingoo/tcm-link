document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const apiKey = 'AIzaSyBIC4d0hxgkz0D2czjoBwEnq2vvKoRg35Q';
    const blogId = '8069277289488798331';

    if (postId) {
        fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${apiKey}`)
            .then(response => response.json())
            .then(post => {
                const postContentContainer = document.getElementById('post-content');
                postContentContainer.innerHTML = `
                    <h1>${post.title}</h1>
                    <div class="news_meta">Posted on ${new Date(post.published).toLocaleDateString()} </div>
                    <p>${post.content}</p>
                `;
                fetchComments(postId);
            })
            .catch(error => console.error('Error fetching the post:', error));
    } else {
        document.getElementById('post-content').innerHTML = '<p>No post ID provided.</p>';
    }

    function fetchComments(postId) {
        fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}/comments?key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = '<h2>Comments</h2>';
                data.items.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment-box');
                    commentElement.innerHTML = `
                        <p><strong>${comment.author.displayName}:</strong> ${comment.content}</p>
                        <p><small>Posted on ${new Date(comment.published).toLocaleDateString()}</small></p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    }
});

function postComment() {
    const author = document.getElementById('comment-author').value;
    const content = document.getElementById('comment-content').value;
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const apiKey = 'AIzaSyBIC4d0hxgkz0D2czjoBwEnq2vvKoRg35Q';
    const blogId = '8069277289488798331';

    const feedbackElement = document.createElement('p');
    feedbackElement.id = 'feedback-message';
    feedbackElement.style.display = 'none';
    document.querySelector('.comment-form').appendChild(feedbackElement);

    if (author.trim() === '' || content.trim() === '') {
        showFeedback('Please fill in both your name and comment.', 'error');
        return;
    }

    showFeedback('Submitting your comment...', 'info');

    gapi.load('client:auth2', function () {
        console.log('Google API client and auth2 loaded');
        gapi.auth2.init({ client_id: '758794962809-b180fp84efb3qedhvgfe67nas112g6su.apps.googleusercontent.com' }).then(() => {
            console.log('Google Auth initialized');
            gapi.auth2.getAuthInstance().signIn().then(() => {
                console.log('User signed in');
                gapi.client.setApiKey(apiKey);
                gapi.client.load('https://content.googleapis.com/discovery/v1/apis/blogger/v3/rest').then(() => {
                    console.log('Blogger API loaded');
                    return gapi.client.blogger.comments.insert({
                        blogId: blogId,
                        postId: postId,
                        resource: {
                            content: content,
                            author: {
                                displayName: author
                            }
                        }
                    }).then(response => {
                        console.log('Comment posted:', response);
                        showFeedback('Comment posted successfully!', 'success');
                        fetchComments(postId);
                        clearCommentForm();
                    }, error => {
                        console.error('Error posting comment:', error);
                        showFeedback('Failed to post comment. Please try again later.', 'error');
                    });
                }).catch(error => {
                    console.error('Error loading Blogger API:', error);
                    showFeedback('Error loading Blogger API. Please try again later.', 'error');
                });
            }).catch(error => {
                console.error('Error during sign-in:', error);
                showFeedback('Authentication failed. Please try again.', 'error');
            });
        }).catch(error => {
            console.error('Error initializing Google Auth:', error);
            showFeedback('Initialization failed. Please try again.', 'error');
        });
    });
}

function showFeedback(message, type) {
    const feedbackMessage = document.getElementById('feedback-message');
    feedbackMessage.style.display = 'block';
    feedbackMessage.style.color = type === 'success' ? 'green' : (type === 'error' ? 'red' : 'blue');
    feedbackMessage.textContent = message;
}

function clearCommentForm() {
    document.getElementById('comment-author').value = '';
    document.getElementById('comment-content').value = '';
}
