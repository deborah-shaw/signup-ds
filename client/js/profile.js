// Get token from localStorage
const token = localStorage.getItem("token");

// Protect page
if (!token) {
    window.location.href = "login.html";
}

// Display user data
async function loadProfile() {
    let response = await fetch("http://localhost:3000/profile", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    let user = await response.json();
    document.querySelector("#name").textContent = user.fName || "No info";
    document.querySelector("#username").textContent = user.username;
    document.querySelector("#email").textContent = user.email;

    document.querySelector("#fName").textContent = user.fName || "No info";
    document.querySelector("#lName").textContent = user.lName || "No info";
    document.querySelector("#gender").textContent = user.gender === "m" ? "Male" : user.gender === "f" ? "Female" : "Not specified";

    document.querySelector("#city").textContent = user.city || "No info";
    document.querySelector("#state").textContent = user.state || "No info";
    document.querySelector("#zip").textContent = user.zip || "No info";
    document.querySelector("#latitude").textContent = user.latitude || "No info";
    document.querySelector("#longitude").textContent = user.longitude || "No info";
}

loadProfile();

// Logout
document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("token");    // remove token
    window.location.href = "login.html";
});