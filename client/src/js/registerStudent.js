const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;

  const matricNumber = document.getElementById("matricNumber").value;

  const fingerprintId = document.getElementById("fingerprintId").value;

  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/students", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      fullName,
      matricNumber,
      fingerprintId,
    }),
  });

  const data = await response.json();

  alert(data.message);
});
