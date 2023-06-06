document.getElementById('signup').addEventListener('submit', function(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let data = {
    username: username,
    password: password
  };

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An error occurred while sending the request. Status: ' + response.status);
    }
  })
  .then(response => {
    alert(response.message);
    window.open("../index.html");
    window.location.href = "../index.html";
  })
  .catch(error => {
    alert(error.message);
  });
});