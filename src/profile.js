document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('log-out').addEventListener('click', function(e) {
      e.preventDefault(); 
      localStorage.removeItem('token'); // Make sure to remove the token, not 'user'
      window.location.href = 'login.html'; 
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
      const jwt = localStorage.getItem('token');

      if (!jwt) {
          throw new Error('JWT not found');
      }

      const query = `
          query GetUserInfo {
              user {
               firstName
                  lastName
                  email
                  login
                  id

              }
          }
      `;

      const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}` 
          },
          body: JSON.stringify({ query })
      });

      if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Response Error:', errorResponse); 
          throw new Error('Failed to fetch user data');
      }

      const { data, errors } = await response.json();
      if (errors) {
          console.error('GraphQL errors:', errors); 
          throw new Error('GraphQL query failed');
      }

      const user = data.user;
      if (!user) {
          throw new Error('User data not found in response');
      }

      document.getElementById('user-id').textContent = user[0].id;
      document.getElementById('user-login').textContent = user[0].login;
      document.getElementById('firstName').textContent = user[0].firstName;
      document.getElementById('lastName').textContent = user[0].lastName ;
      document.getElementById('userName').textContent = user[0].firstName ;
      const xpTransactionsList = document.getElementById('xp-transactions');
      user.xpTransactions.forEach(transaction => {
          const li = document.createElement('li');
          li.textContent = `Amount: ${transaction.amount}, Date: ${transaction.createdAt}`;
          xpTransactionsList.appendChild(li);
      });

      const progressList = document.getElementById('progress');
      user.progress.forEach(progress => {
          const li = document.createElement('li');
          li.textContent = `Object ID: ${progress.objectId}, Grade: ${progress.grade}, Date: ${progress.createdAt}`;
          progressList.appendChild(li);
      });
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
});
