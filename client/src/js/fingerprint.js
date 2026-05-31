const captureBtn = document.getElementById("captureBtn");

const saveBtn = document.getElementById("saveBtn");

const fingerprintImage = document.getElementById("fingerprintImage");

// const fingerprintIdInput = document.getElementById("fingerprintId");

const scanLine = document.getElementById("scanLine");

const placeholder = document.getElementById("placeholder");

let capturedFingerprint = null;

// CAPTURE FINGERPRINT
captureBtn.addEventListener("click", async () => {
  // start scan animation
  alert("Place your thumb on the scanner");
  scanLine.classList.remove("hidden");
  placeholder.innerText = "Scanning Fingerprint...";

  // fake delay

  setTimeout(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/fingerprint/capture",
        {
          method: "POST",
        },
      );

      const data = await response.json();

      // stop animation
      scanLine.classList.add("hidden");

      // display fingerprint image
      fingerprintImage.src = data.image;
      fingerprintImage.classList.remove("hidden");
      placeholder.classList.add("hidden");

      // display generated ID
      // fingerprintIdInput.value = data.fingerprintId;

      // if (fingerprintIdInput.value) {
      //   console.log("Student already mark attandance");
      // }
      // store
      capturedFingerprint = data;
    } catch (error) {
      console.log(error);

      alert("Fingerprint capture failed");
    }
  }, 3000);
});

// SAVE FINGERPRINT
saveBtn.addEventListener("click", async () => {
  if (!capturedFingerprint) {
    return alert("Capture fingerprint first");
  }
  const selectedThumb = document.querySelector(
    'input[name="thumb"]:checked',
  ).value;
  const matricNo = localStorage.getItem("MatricNo");
  try {
    const response = await fetch("http://localhost:5000/api/fingerprint/save", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        thumb: selectedThumb,
        // fingerprintId: capturedFingerprint.fingerprintId,
        image: capturedFingerprint.image,
        matricNo,
      }),
    });

    const data = await response.json();

    //redirect to dashboard
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 2000);
    // alert(data.message);
    localStorage.setItem("message", data.message);
  } catch (error) {
    console.log(error.message);

    // console.log("Student already mark attendance");
  }
});
