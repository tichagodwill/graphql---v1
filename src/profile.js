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

      // 1. Queries for User Transactions

const fetchXpTransactions = `
query RetrieveXpTransactions {
  transaction(where: { type: { _eq: "xp" } }) {
    id
    type
    amount
    objectId
    userId
    createdAt
    path
  }
}
`;

const fetchUpTransactions = `
query RetrieveUpTransactions {
  transaction(where: { type: { _eq: "up" } }) {
    id
    type
    amount
    objectId
    userId
    createdAt
    path
  }
}
`;

const fetchDownTransactions = `
query RetrieveDownTransactions {
  transaction(where: { type: { _eq: "down" } }) {
    id
    type
    amount
    objectId
    userId
    createdAt
    path
  }
}
`;

// 2. Query for User Progress

const fetchUserProgress = `
query RetrieveUserProgress {
  progress(where: { object: { type: { _eq: "project" } } }) {
    id
    userId
    objectId
    grade
    createdAt
    updatedAt
    object {
      id
      name
      type
      attrs
    }
  }
}
`;

// 3. Query for User Results

const fetchUserResults = `
query RetrieveUserResults {
  result {
    id
    userId
    objectId
    grade
    createdAt
    updatedAt
  }
}
`;

// 4. Object Data Query

const fetchObjectsById = `
query RetrieveObjects($objectIds: [Int!]!) {
  object(where: { id: { _in: $objectIds } }) {
    id
    name
    type
    attrs
  }
}
`;

// 5. User Details Query

const fetchUserInfo = `
query RetrieveUserInfo($accountId: Int!) {
  user {
    id
    login
    totalUp
    totalDown
    auditRatio
  }
  event_user(where: { userId: { _eq: $accountId }, eventId: {_eq: 20}}){
    level
    userAuditRatio
  }
}
`;

// 6. Basic User Information Query

const fetchBasicUserInfo = `
query RetrieveBasicUser {
  user {
    id
    login
  }
}
`;

// 7. Query for User Skills

const fetchUserSkills = `
query RetrieveUserSkills {
  user {
    transactions(
      order_by: [{ type: desc }, { amount: desc }]
      distinct_on: [type]
      where: {
        type: { _in: ["skill_js", "skill_go", "skill_html", "skill_prog", "skill_front-end", "skill_back-end"] }
      }
    ) {
      type
      amount
    }
  }
}
`;

// 8. User Statistics Query

const fetchUserStats = `
query RetrieveDeveloperStatus {
  user {
    attrs
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
