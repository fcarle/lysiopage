document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('blog-posts-container');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwDNZwZYegaLaL8s4sNba0rcyqadI-kd_EEhUtZIjFYwXVtSTQr9_MKy8qP5xUfDAgj/exec';

    fetch(scriptURL)
        .then(res => res.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Clear "Loading..." message
            if (posts.length === 0) {
                postsContainer.innerHTML = '<p>No posts have been published yet. Check back soon!</p>';
                return;
            }
            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.className = 'blog-post-item';

                const postDate = new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <div class="post-meta">
                        <span>By ${post.author}</span> | <span>${postDate}</span>
                    </div>
                    <div class="post-content">
                        ${post.content}
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            postsContainer.innerHTML = `<p class="error-message">Could not load posts. Please try again later.</p>`;
            console.error('Error fetching blog posts:', error);
        });
}); 