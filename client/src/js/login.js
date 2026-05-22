const form = document.getElementById("loginForm");
const errorBox = document.getElementById("errorBox");
// const role = document.getElementById("role").value;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = ""; // clear previous error

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // IMPORTANT: handle backend errors properly
    if (!response.ok) {
      return (errorBox.textContent = data.message || "Login failed");
    }

    // success
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "./dashboard.html";
    }
  } catch (err) {
    errorBox.textContent = "Invalid Email or Password.";
  }
});
