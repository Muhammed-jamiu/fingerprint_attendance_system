const attendanceForm = document.querySelector("#attendanceForm");
const errorMessage = document.querySelector("#message");
const attendanceBtn = document.querySelector("#attendanceBtn");

attendanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMessage.textContent = "";

  const matricNo = document.querySelector("#matricNo").value;

  try {
    // Disable button and show spinner
    attendanceBtn.disabled = true;

    attendanceBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Marking Attendance...</span>
    `;

    const API_URL =
      "https://fingerprint-attendance-system-qalw.onrender.com/api";

    const response = await fetch(`${API_URL}/attendance/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricNo,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      errorMessage.textContent = data.message;
      return;
    }

    localStorage.setItem("matricNo", matricNo);

    // Redirect to fingerprint page
    window.location.href = "fingerprint.html";
  } catch (error) {
    console.error(error);

    errorMessage.textContent = error.message || "Something went wrong";
  } finally {
    // Restore button
    attendanceBtn.disabled = false;

    attendanceBtn.innerHTML = `
      <span id="btnText">Mark Attendance</span>
    `;
  }
});
