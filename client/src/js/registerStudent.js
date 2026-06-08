const form = document.getElementById("studentForm");
const message = document.querySelector("#message");

const regBtn = document.querySelector("#regbtn");

form.addEventListener(
  "submit",

  async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullName").value;
    const matricNo = document.getElementById("matricNumber").value;

    try {
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

      // IF ERROR
      if (!response.ok) {
        // alert(data.message);
        return (message.innerHTML = data.message);
      }
      // SUCCESS
      alert(data.message);

      //Save matric number to local storage
      localStorage.setItem("matricNum", data.data.matricNo);
      localStorage.setItem("attendanceStatus", data.data.attendanceStatus);

      // REDIRECT
      window.location.href = "./dashboard.html";
    } catch (error) {
      // console.log(error);
      // alert("Something went wrong");
      return (message.innerHTML = "Something went wrong " + error.message);
    }
  },
);
