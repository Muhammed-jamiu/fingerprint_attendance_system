const attendanceForm = document.querySelector("#attendanceForm");
const errorMessage = document.querySelector("#message");

//
attendanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const matricNo = document.querySelector("#matricNo").value;

  try {
    // api url section
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
      return (errorMessage.innerHTML = data.message);
    }
    localStorage.setItem("matricNo", matricNo);
    // redirect to fingerprint page
    window.location.href = "fingerprint.html";
  } catch (error) {
    console.log(error.message);
    //DISPLAYING THE ERROR TO THE USER
    errorMessage.innerHTML = error.message;
  }
});
