const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullName").value;

  const matricNo = document.getElementById("matricNumber").value;

  // const fingerprintId = document.getElementById("fingerprintId").value;

  // const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/student/register", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      fullname,
      matricNo,
      // fingerprintId,
    }),
  });

  const data = await response.json();

  alert(data.message);
  // redirect to fingerprint page
  window.location.href = "./fingerprint.html";
});
