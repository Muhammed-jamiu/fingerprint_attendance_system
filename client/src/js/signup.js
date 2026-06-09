const form = document.getElementById("signupForm");
const errorBox = document.getElementById("errorBox");
const signupBtn = document.getElementById("signupBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = "";

  // Form inputs
  const fullname = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const courseTitle = document.getElementById("courseTitle").value;
  const courseCode = document.getElementById("courseCode").value;

  try {
    // Disable button and show loader
    signupBtn.disabled = true;

    signupBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Processing...</span>
    `;

    const API_URL =
      "https://fingerprint-attendance-system-qalw.onrender.com/api";

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        password,
        courseTitle,
        courseCode,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      errorBox.textContent = data.message || "Signup failed";
      return;
    }

    alert("Account created successfully!");

    window.location.href = "./login.html";
  } catch (err) {
    console.error(err);
    errorBox.textContent = "Something went wrong";
  } finally {
    signupBtn.disabled = false;

    signupBtn.innerHTML = `
      <span id="btnText">Sign Up</span>
    `;
  }
});
