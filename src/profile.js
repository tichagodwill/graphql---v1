
document.getElementById('log-out').addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});






// const url = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

// const fetchProfile = async () => {
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       query: `{
// email
// number
// grades
// audits
        
//         }`,
//     }),
//   }).then((response) => response.json()).then ((data) => {console.log(data)});
// };
