document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }) 
        
    });

    if (response.ok || response.status === 204) {
        const data = await response.json();
        localStorage.setItem('token', data); 
        window.location.href = 'logout.html';
    } else {
        document.getElementById('error-message').innerText = 'Invalid Credentials';
    }
});
