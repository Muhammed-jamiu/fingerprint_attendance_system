const studentCount = document.getElementById("studentCount");

const attendanceCount = document.getElementById("attendanceCount");

async function loadDashboardStats() {
  try {
    const response = await fetch("http://localhost:5000/api/attendance/stats");

    const data = await response.json();

    studentCount.innerText = data.students;

    attendanceCount.innerText = data.attendance;
  } catch (error) {
    console.log(error);

    alert("Failed to load dashboard data");
  }
}

loadDashboardStats();
