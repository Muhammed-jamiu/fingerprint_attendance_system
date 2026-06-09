const form = document.getElementById("loginForm");
const errorBox = document.getElementById("errorBox");
const loginBtn = document.getElementById("loginBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Disable button and show loading spinner
    loginBtn.disabled = true;

    loginBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Logining...</span>
    `;

    const API_URL =
      "https://fingerprint-attendance-system-qalw.onrender.com/api";

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      errorBox.textContent = data.message || "Login failed";
      return;
    }

    // Save user information
    localStorage.setItem("adminName", data.data.fullname);
    localStorage.setItem("courseCode", data.data.courseCode);
    localStorage.setItem("courseTitle", data.data.courseTitle);

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "./dashboard.html";
    }
  } catch (err) {
    console.error(err);
    errorBox.textContent = "Invalid Email or Password.";
  } finally {
    // Restore button
    loginBtn.disabled = false;

    loginBtn.innerHTML = `
      <span id="btnText">Login</span>
    `;
  }
});
