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
      const API_URL =
        "https://fingerprint-attendance-system-qalw.onrender.com/api";
      const response = await fetch(`${API_URL}/fingerprint/capture`, {
        method: "POST",
      });

      const data = await response.json();

      // stop animation
      scanLine.classList.add("hidden");

      // display fingerprint image
      fingerprintImage.src = data.image;
      fingerprintImage.classList.remove("hidden");
      placeholder.classList.add("hidden");

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

  const matricNo = localStorage.getItem("matricNo");

  try {
    // Disable button and show loading state
    saveBtn.disabled = true;

    saveBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Saving...</span>
    `;

    const API_URL =
      "https://fingerprint-attendance-system-qalw.onrender.com/api";

    const response = await fetch(`${API_URL}/fingerprint/save`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        thumb: selectedThumb,
        image: capturedFingerprint.image,
        matricNo,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save fingerprint");
    }

    localStorage.setItem("message", data.message);

    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 2000);
  } catch (error) {
    console.log(error.message);

    alert(error.message);

    // Re-enable button if save fails
    saveBtn.disabled = false;

    saveBtn.innerHTML = `
      <span id="saveBtnText">Save Fingerprint</span>
    `;
  }
});
