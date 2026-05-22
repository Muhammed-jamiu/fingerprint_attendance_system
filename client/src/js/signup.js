const form = document.getElementById("signupForm");
const errorBox = document.getElementById("errorBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = "";

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.textContent = data.message || "Signup failed";
      return;
    }

    alert("Account created successfully!");

    // redirect to login page
    window.location.href = "./login.html";
  } catch (err) {
    errorBox.textContent = `Email already exist`;
  }
});
