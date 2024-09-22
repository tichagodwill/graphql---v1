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
            "username": username,
            "password": password
        })   //.then((response) => response.json()).then((data) => { console.log(data) }) 
    });

    if (response.ok || response.status === 204) {
        // Handle the case where the response is either 200-299 or 204
        if (response.status === 204) {
            console.log("Request processed successfully, no content returned.");
            window.location.href = 'profile.html';
        } else {
            const data = await response.json();
            localStorage.setItem('token', data.token); 
            window.location.href = 'profile.html';
        }
    } else {
        document.getElementById('error-message').innerText = 'Invalid Credentials';
    }
});
