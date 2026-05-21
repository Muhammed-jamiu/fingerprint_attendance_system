const form = document.getElementById("attendanceForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fingerprintId = document.getElementById("fingerprintId").value;

  const response = await fetch("http://localhost:5000/api/attendance/mark", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      fingerprintId,
    }),
  });

  const data = await response.json();

  alert(data.message);
});
