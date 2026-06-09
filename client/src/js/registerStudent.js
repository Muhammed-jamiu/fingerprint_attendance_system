const form = document.getElementById("studentForm");
const message = document.querySelector("#message");
const regBtn = document.querySelector("#regbtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "";

  const fullname = document.getElementById("fullName").value;
  const matricNo = document.getElementById("matricNumber").value;

  try {
    // Disable button and show spinner
    regBtn.disabled = true;

    regBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Registering Student...</span>
    `;

    const API_URL =
      "https://fingerprint-attendance-system-qalw.onrender.com/api";

    const response = await fetch(`${API_URL}/students/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        matricNo,
      }),
    });

    const data = await response.json();

    console.log(data.data);

    // Error handling
    if (!response.ok) {
      message.textContent = data.message;
      return;
    }

    // Success
    alert(data.message);

    localStorage.setItem("matricNum", data.data.matricNo);
    localStorage.setItem("attendanceStatus", data.data.attendanceStatus);

    window.location.href = "./dashboard.html";
  } catch (error) {
    message.textContent = "Something went wrong: " + error.message;
  } finally {
    // Restore button
    regBtn.disabled = false;

    regBtn.innerHTML = `
      <span id="btnText">Register Student</span>
    `;
  }
});
