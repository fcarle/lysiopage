document.addEventListener('DOMContentLoaded', () => {
    const passwordProtection = document.getElementById('password-protection');
    const adminContent = document.getElementById('admin-content');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');

    // Replace "YOUR_PASSWORD_HERE" with the actual password
    const CORRECT_PASSWORD = "Lyiso123$ hello";

    passwordSubmit.addEventListener('click', () => {
        if (passwordInput.value === CORRECT_PASSWORD) {
            passwordProtection.style.display = 'none';
            adminContent.style.display = 'block';
        } else {
            passwordError.style.display = 'block';
        }
    });

    // Also allow pressing "Enter" to submit
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            passwordSubmit.click();
        }
    });

    const blogPostForm = document.getElementById('blog-post-form');
    const publishStatus = document.getElementById('publish-status');

    blogPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const post = {
            title: document.getElementById('post-title').value,
            content: document.getElementById('post-content').value,
            author: document.getElementById('post-author').value
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwDNZwZYegaLaL8s4sNba0rcyqadI-kd_EEhUtZIjFYwXVtSTQr9_MKy8qP5xUfDAgj/exec';
        
        publishStatus.textContent = 'Publishing...';
        publishStatus.style.color = '#00f6ff';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(data => {
            if(data.result === 'success') {
                publishStatus.textContent = `Successfully published post: "${data.post.title}"`;
                publishStatus.style.color = '#66ff66';
                blogPostForm.reset();
            } else {
                throw new Error(data.message || 'An unknown error occurred.');
            }
        })
        .catch(error => {
            publishStatus.textContent = `Error: ${error.message}`;
            publishStatus.style.color = '#d9534f';
        });
    });
}); 