const form = document.getElementById("loginForm");
const errorBox = document.getElementById("errorBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = ""; // clear previous error

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
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
    console.log(data.data.fullname);

    //saving admin name, courseTittle and courseCode to the localstorage
    localStorage.setItem("adminName", data.data.fullname);
    localStorage.setItem("courseCode", data.data.courseCode);
    localStorage.setItem("courseTitle", data.data.courseTitle);

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
