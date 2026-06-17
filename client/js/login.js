document.querySelector(".togglePassword").addEventListener("click", togglePassword);
document.querySelector("#loginForm").addEventListener("submit", loginUser);

// Toggle password visibility
function togglePassword() {
  let input = document.querySelector("#password");
  if (input.type === "password") {
    input.type = "text";
	  this.textContent = "🔒";
  }
  else {
    input.type = "password";
	  this.textContent = "👁";
  }
}

async function loginUser(e) {
  e.preventDefault();

  document.querySelector("#loginError").innerHTML = "";

  let response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value
    })
  });

  let data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.token);    // store token
    window.location.href = "profile.html";      // redirect to welcome or profile page
  }
  else {
    document.querySelector("#loginError").innerHTML = data.message;
    document.querySelector("#loginError").style.color = "red";
  }
}
