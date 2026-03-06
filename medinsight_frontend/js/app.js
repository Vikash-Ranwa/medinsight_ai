// 🔹 Set your Django backend URL here
// Example:
// const API_BASE = "http://127.0.0.1:8001/api";
// const API_BASE = "https://your-render-app.onrender.com/api";

const API_BASE = "https://medinsight-ai.onrender.com/api"

function warmupServer() {
  fetch(`${API_BASE}/warmup/`)
  .then(() => {})
  .catch(() => {});
}
document.addEventListener("DOMContentLoaded", () => {warmupServer();});

/* ===============================
   Helper Functions
================================= */

function showLoading(id, message = "Processing...") {
  document.getElementById(id).innerHTML = `
    <div style="display:flex;gap:10px;align-items:center">
      <div class="spinner"></div>
      <div>${message}</div>
    </div>
  `;
}

function showError(id, message) {
  document.getElementById(id).innerHTML = `
    <div style="color:#b52222;font-weight:600">
      ${message}
    </div>
  `;
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderResultCard(summary, details, duration) {
  return `
    <div class="result">
      <div class="meta">
        <div class="summary">${marked.parse(summary)}</div>
        <div style="margin-left:auto;color:#6b7a90;font-size:13px;">
          ${duration ? duration + " ms" : ""}
        </div>
      </div>

      <div class="details">
        ${marked.parse(details)}
      </div>

      <div class="action-row" style="margin-top:14px;">
        <button class="btn speak-btn" onclick="readText(this)">
          Read Aloud
        </button>
        <button class="btn secondary" onclick="copyText(this)">
          Copy
        </button>
      </div>
    </div>
  `;
}

function copyText(btn) {
  const details = btn.closest(".result").querySelector(".details").innerText;
  navigator.clipboard.writeText(details);
  btn.innerText = "Copied";
  setTimeout(() => (btn.innerText = "Copy"), 1200);
}

let currentUtterance = null;

function readText(btn) {
  const resultCard = btn.closest(".result");
  const text = resultCard.querySelector(".details").innerText;

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    btn.innerText = "Read Aloud";
    return;
  }

  const speakNow = () => {
    const voices = speechSynthesis.getVoices();

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = "en-US";

    // DIRECTLY select Google US English Female
    const femaleVoice = voices.find(
      v => v.name === "Google US English Female"
    );

    if (femaleVoice) {
      currentUtterance.voice = femaleVoice;
    }

    currentUtterance.rate = 1;
    currentUtterance.pitch = 1;

    speechSynthesis.speak(currentUtterance);

    btn.innerText = "Stop";

    currentUtterance.onend = () => {
      btn.innerText = "Read Aloud";
    };
  };

  // Wait for voices to load
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = speakNow;
  } else {
    speakNow();
  }
}

function stopSpeech(btn) {
  speechSynthesis.cancel();
  btn.innerText = "Read Aloud";
  btn.onclick = () => readText(btn);
}
/* ===============================
   Prescription Upload
================================= */

async function uploadPrescription() {
  const file = document.getElementById("prescriptionFile").files[0];
  if (!file) return alert("Please upload an image");

  const target = "prescriptionResult";
  showLoading(target, "Uploading & analyzing...");

  const form = new FormData();
  form.append("file", file);

  try {
    const res = await fetch(`${API_BASE}/analyze/prescription/`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

const fullText = data.result?.explanation || "";

const lines = fullText.split("\n").filter(l => l.trim() !== "");

const summary = lines[0] || "Explanation";

// Remove first line from body
const details = lines.slice(1).join("\n");

    document.getElementById(target).innerHTML =
      renderResultCard(summary, details);

  } catch (err) {
    console.error(err);
    showError(target, "Server error. Try again later.");
  }
}

/* ===============================
   CXR Upload
================================= */

async function uploadCXR() {
  const file = document.getElementById("cxrFile").files[0];
  if (!file) return alert("Please upload an X-ray image");

  const target = "cxrResult";
  showLoading(target, "Analyzing X-ray...");

  const form = new FormData();
  form.append("file", file);

  try {
    const res = await fetch(`${API_BASE}/analyze/cxr/`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    const summary = data.result.prediction
      ? `${data.result.prediction} — Confidence: ${(Number(data.result.confidence) * 100).toFixed(0)}%`
      : "X-ray Prediction";

    const details = data.result.explanation || "No explanation returned.";

    document.getElementById(target).innerHTML =
      renderResultCard(summary, details);

  } catch (err) {
    console.error(err);
    showError(target, "Server error. Try again later.");
  }
}

/* ===============================
   Clinical QA
================================= */

async function askQA() {
  const history = document.getElementById("history").value;
  const question = document.getElementById("question").value;

  if (!question) return alert("Please enter a question");

  const target = "qaResult";
  showLoading(target, "Generating answer...");

  const form = new FormData();
  form.append("history", history);
  form.append("question", question);

  try {
    const res = await fetch(`${API_BASE}/analyze/qa/`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error("Server error");

const data = await res.json();

const fullText = data.result?.answer || "";

const lines = fullText.split("\n").filter(l => l.trim() !== "");

const summary = lines[0] || "Explanation";

// Remove first line from body
const details = lines.slice(1).join("\n");

    document.getElementById(target).innerHTML =
      renderResultCard(summary, details);

  } catch (err) {
    console.error(err);
    showError(target, "Server error. Try again later.");
  }
}
