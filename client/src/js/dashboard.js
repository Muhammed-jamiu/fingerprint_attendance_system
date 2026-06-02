const studentCount = document.getElementById("studentCount");

const attendanceCount = document.getElementById("attendanceCount");
const courseCode = document.querySelector("#courseCode");
const courseTitle = document.querySelector("#courseTitle");
const adminName = document.getElementById("adminName");

const studentList = document.getElementById("studentList");

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("adminName");
  localStorage.removeItem("courseCode");
  localStorage.removeItem("courseTitle");
  localStorage.removeItem("attendanceStatus");
  window.location.href = "./login.html";
}

// LOAD DASHBOARD DATA
async function loadDashboardStats() {
  try {
    const response = await fetch("http://localhost:5000/api/students");

    const data = await response.json();

    // GET STUDENTS ARRAY
    const students = data.data;

    // TOTAL STUDENTS
    studentCount.innerText = students.length;

    // TOTAL PRESENT STUDENTS
    const presentStudents = students.filter((student) => {
      return student.attendanceStatus === "present";
    });
    attendanceCount.innerHTML = presentStudents.length;

    console.log(presentStudents);

    // CLEAR OLD LIST
    studentList.innerHTML = "";

    // LOOP THROUGH STUDENTS
    students.forEach((student) => {
      // CREATE CARD
      const studentCard = document.createElement("div");

      // STATUS COLOR
      const statusColor =
        student.attendanceStatus === "present" ? "bg-green-500" : "bg-red-500";

      // STATUS TEXT
      const statusText =
        student.attendanceStatus === "present" ? "Present" : "Absent";

      // CARD HTML
      studentCard.innerHTML = `

          <div
            class="
              grid
              grid-cols-3
              items-center
              justify-around
              bg-gray-50
              p-2
              rounded
              shadow-sm
            "
          >

            <p class="font-semibold ">
              ${student.fullname}
            </p>

            <p class="text-gray-600  text-center">
              ${student.matricNo}
            </p>

            <div class="flex justify-center ">

              <span
                class="
                  ${statusColor}
                  text-white
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  font-bold
                "
              >

                ${statusText}

              </span>

            </div>

          </div>

        `;

      // APPEND TO LIST
      studentList.appendChild(studentCard);
    });
  } catch (error) {
    console.log(error);
  }

  // DISPLAY ADMIN NAME

  const adminStoredName = localStorage.getItem("adminName");
  const storeCourseCode = localStorage.getItem("courseCode");
  const storeCourseTitle = localStorage.getItem("courseTitle");

  adminName.innerText = adminStoredName;
  courseCode.innerText = storeCourseCode;
  courseTitle.innerText = storeCourseTitle;
}

// date section
const currentDateTime = document.getElementById("currentDateTime");

function updateDateTime() {
  const now = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const currentDay = ["Mon", "Tue", "Wes", "Thur", "Fir", "Sat", "Sun"];

  const monthName = months[now.getMonth()];
  // const dayName = currentDay[now.getDay()];

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  currentDateTime.innerText = ` ${monthName}, ${day}-${month}-${year}: ${hours}:${minutes}: ${second} ${ampm}`;
}

// Run immediately
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);
// INITIAL LOAD
loadDashboardStats();
