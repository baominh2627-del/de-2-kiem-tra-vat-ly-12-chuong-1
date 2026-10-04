import { examData } from "./data.js";
import { db, ref, push, set, update, serverTimestamp } from "./firebase-config.js";
import { getMTSeduSession, showLoginRequired, insertBackButton } from "./mtsedu-auth.js";

const loginScreen = document.getElementById("login-screen");
const examScreen = document.getElementById("exam-screen");
const resultScreen = document.getElementById("result-screen");
const questionsContainer = document.getElementById("questions-container");
const questionBoard = document.getElementById("question-board");
const submitBtn = document.getElementById("submit-btn");

// ===== CHỈ THAY 4 DÒNG NÀY =====
const MA_DE        = "VATLY12_CHUONG1_DE2";           // mã đề Firebase (không dấu, không cách)
const DRAFT_KEY    = "examDraft_VATLY12_CHUONG1_DE2"; // key localStorage
const EXAM_MINUTES = 50;                               // thời gian làm bài (phút)
const RETURN_HASH  = "#physics";                       // hash trang MTSedu
// ================================

let timeRemaining = EXAM_MINUTES * 60;
let timerInterval;
let userAnswers = {};
let flaggedQuestions = {};
let isFinished = false;
let cheatCount = 0;
let studentName = "";
let studentClass = "";

window.addEventListener("DOMContentLoaded", () => {
  const session = getMTSeduSession();
  if (!session) {
    const loginCard = loginScreen.querySelector(".form-card") || loginScreen.querySelector(".card");
    if (loginCard) showLoginRequired(loginCard, RETURN_HASH);
    return;
  }
  studentName = session.displayName || session.username;
  studentClass = session.username;
  insertBackButton();

  const draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
  if (draft && !draft.isFinished && draft.studentName === studentName) {
    loadDraftAndContinue(draft);
  } else {
    startExamDirectly();
  }
});

function startExamDirectly() {
  userAnswers = {}; flaggedQuestions = {}; cheatCount = 0; isFinished = false;
  localStorage.removeItem(DRAFT_KEY);
  timeRemaining = EXAM_MINUTES * 60;
  document.getElementById("display-name").innerText = studentName;
  document.getElementById("display-class").innerText = studentClass;
  loginScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  renderExam(); restoreDOMState(); renderBoard(); startTimer(); setupAntiCheat();
}

function loadDraftAndContinue(draft) {
  studentName = draft.studentName || studentName;
  studentClass = draft.studentClass || studentClass;
  timeRemaining = draft.timeRemaining;
  userAnswers = draft.userAnswers || {};
  flaggedQuestions = draft.flaggedQuestions || {};
  cheatCount = draft.cheatCount || 0;
  document.getElementById("display-name").innerText = studentName;
  document.getElementById("display-class").innerText = studentClass;
  loginScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  renderExam(); restoreDOMState(); renderBoard(); startTimer(); setupAntiCheat();
}

function renderExam() {
  questionsContainer.innerHTML = "";
  let currentPart = 0, qCounter = 1;
  const partTitles = {
    1: { title: "Phần I — Trắc nghiệm khách quan", score: "4.5 điểm", sub: "Mỗi câu đúng được 0.25 điểm. Chọn một đáp án duy nhất." },
    2: { title: "Phần II — Trắc nghiệm đúng sai", score: "4.0 điểm", sub: "Trong mỗi ý a, b, c, d, chọn đúng hoặc sai." },
    3: { title: "Phần III — Trắc nghiệm trả lời ngắn", score: "1.5 điểm", sub: "Mỗi câu 0.25 điểm. Nhập đáp án (chỉ ghi số hoặc kết quả cuối cùng)." },
  };

  examData.forEach((q) => {
    if (q.part !== currentPart) {
      currentPart = q.part;
      const header = document.createElement("div");
      header.className = "section-header";
      header.innerHTML = `
        <div class="section-title">${partTitles[currentPart].title} <span class="badge">${partTitles[currentPart].score}</span></div>
        <div class="section-subtitle">${partTitles[currentPart].sub}</div>`;
      questionsContainer.appendChild(header);
      qCounter = 1;
    }
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `q-card-${q.id}`;

    let html = `<div class="q-layout"><div class="q-header"><div class="q-num-flag">
      <div class="q-num">Câu ${qCounter}</div>
      <button class="btn-flag ${flaggedQuestions[q.id] ? "active" : ""}" data-id="${q.id}" title="Đánh dấu">
        ${flaggedQuestions[q.id] ? "★" : "☆"}</button>
    </div></div><div class="q-content">
    <div class="q-text">${q.question}</div>
    ${q.image ? `<div class="q-image"><img src="${q.image}" alt="Hình câu ${qCounter}"></div>` : ""}`;

    if (q.part === 1) {
      html += `<div class="options-list">`;
      q.options.forEach((opt, idx) => {
        html += `<label class="option-label" id="lbl-${q.id}-${idx}">
          <input type="radio" name="ans-${q.id}" value="${idx}">
          <span class="opt-letter">${["A","B","C","D"][idx]}.</span> ${opt}</label>`;
      });
      html += `</div>`;
    } else if (q.part === 2) {
      q.statements.forEach((stmt, idx) => {
        html += `<div class="tf-row" id="row-${q.id}-${idx}">
          <div><strong>${["a","b","c","d"][idx]})</strong> ${stmt.text}</div>
          <div class="tf-controls">
            <label><input type="radio" name="tf-${q.id}-${idx}" value="true"> Đúng</label>
            <label><input type="radio" name="tf-${q.id}-${idx}" value="false"> Sai</label>
          </div></div>`;
      });
    } else if (q.part === 3) {
      html += `<input type="text" class="short-ans-input" name="ans-${q.id}" placeholder="Nhập đáp án...">`;
    }

    html += `<div class="explanation hidden" id="exp-${q.id}"><strong>Hướng dẫn giải:</strong> ${q.explanation}</div></div></div>`;
    card.innerHTML = html;
    questionsContainer.appendChild(card);
    qCounter++;
  });

  document.querySelectorAll(".btn-flag").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const qid = e.target.closest(".btn-flag").getAttribute("data-id");
      flaggedQuestions[qid] = !flaggedQuestions[qid];
      e.target.closest(".btn-flag").classList.toggle("active");
      e.target.closest(".btn-flag").innerText = flaggedQuestions[qid] ? "★" : "☆";
      updateBoard(); saveDraft();
    });
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const name = e.target.name;
      if (name.startsWith("ans-") && e.target.type === "radio") {
        const qid = name.replace("ans-", "");
        document.querySelectorAll(`input[name="${name}"]`).forEach((r) =>
          r.closest(".option-label").classList.remove("selected"));
        e.target.closest(".option-label").classList.add("selected");
        userAnswers[qid] = parseInt(e.target.value);
      } else if (name.startsWith("tf-")) {
        const parts = name.split("-");
        const qid = parts[1];
        const idx = parts[2];
        if (!userAnswers[qid]) userAnswers[qid] = {};
        userAnswers[qid][idx] = e.target.value;
      } else if (e.target.type === "text") {
        userAnswers[name.replace("ans-", "")] = e.target.value;
      }
      updateBoard(); saveDraft();
    });
  });

  if (window.MathJax) MathJax.typesetPromise();
}

function renderBoard() {
  if (!questionBoard) return;
  // Legend riêng — không nằm trong q-grid để không làm lệch các ô số
  const legend = document.createElement("div");
  legend.className = "board-legend";
  legend.innerHTML = `
    <span class="box"></span><span class="box-label">Chưa làm</span>
    <span class="box done"></span><span class="box-label">Đã làm</span>
    <span class="box flagged"></span><span class="box-label">Đánh dấu</span>`;
  questionBoard.appendChild(legend);

  // Grid chứa các ô số câu
  const grid = document.createElement("div");
  grid.className = "q-grid";
  grid.id = "q-grid-inner";
  questionBoard.appendChild(grid);

  examData.forEach((q, index) => {
    const box = document.createElement("button");
    box.className = "q-box"; box.id = `box-${q.id}`; box.innerText = index + 1; box.type = "button";
    box.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(`q-card-${q.id}`).scrollIntoView({ behavior: "smooth", block: "center" });
    });
    grid.appendChild(box);
  });
  updateBoard();
}

function updateBoard() {
  let answeredCount = 0;
  examData.forEach((q) => {
    let answered = false;
    if (q.part === 1 && userAnswers[q.id] !== undefined) answered = true;
    if (q.part === 2 && userAnswers[q.id] && Object.keys(userAnswers[q.id]).length === 4) answered = true;
    if (q.part === 3 && userAnswers[q.id] && userAnswers[q.id].trim() !== "") answered = true;
    if (answered) answeredCount++;
    if (questionBoard) {
      const box = document.getElementById(`box-${q.id}`);
      if (box) {
        box.className = "q-box";
        if (flaggedQuestions[q.id]) box.classList.add("flagged");
        else if (answered) box.classList.add("done");
      }
    }
  });
  const countEl = document.getElementById("answered-count");
  if (countEl) countEl.innerText = `${answeredCount}/${examData.length}`;
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify({
    studentName, studentClass, timeRemaining,
    userAnswers, flaggedQuestions, cheatCount, isFinished,
    lastSaved: new Date().toISOString(),
  }));
}

function restoreDOMState() {
  document.querySelectorAll("input").forEach((input) => {
    const name = input.name;
    if (!name) return;
    if (input.type === "radio" && name.startsWith("ans-")) {
      const qid = name.replace("ans-", "");
      if (userAnswers[qid] == input.value) {
        input.checked = true;
        input.closest(".option-label").classList.add("selected");
      }
    } else if (input.type === "radio" && name.startsWith("tf-")) {
      const parts = name.split("-");
      const qid = parts[1];
      const idx = parts[2];
      if (userAnswers[qid] && userAnswers[qid][idx] === input.value) input.checked = true;
    } else if (input.type === "text") {
      const qid = name.replace("ans-", "");
      input.value = userAnswers[qid] || "";
    }
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--; saveDraft();
    const m = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
    const s = (timeRemaining % 60).toString().padStart(2, "0");
    document.getElementById("countdown").innerText = `${m}:${s}`;
    if (timeRemaining === 30) {
      alert("⚠️ Cảnh báo: Chỉ còn 30 giây!");
      document.querySelector(".timer-pill").classList.add("timer-danger");
    }
    if (timeRemaining <= 0) { clearInterval(timerInterval); submitExam(); }
  }, 1000);
}

function setupAntiCheat() {
  window.addEventListener("beforeunload", (e) => {
    if (!isFinished) { e.preventDefault(); e.returnValue = "Bạn chưa nộp bài!"; }
  });
  window.addEventListener("pagehide", () => { if (!isFinished) saveDraft(); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !isFinished) { cheatCount++; saveDraft(); }
  });
}

submitBtn.addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn nộp bài?")) submitExam();
});

function submitExam() {
  isFinished = true; clearInterval(timerInterval);
  document.querySelectorAll("input, .btn-flag").forEach((el) => (el.disabled = true));
  submitBtn.style.display = "none";
  const timerPill = document.querySelector(".timer-pill");
  if (timerPill) timerPill.classList.remove("timer-danger");

  let totalScore = 0, diemPhan1 = 0, diemPhan2 = 0, diemPhan3 = 0;

  examData.forEach((q) => {
    document.getElementById(`exp-${q.id}`).classList.remove("hidden");
    if (q.part === 1) {
      const selected = userAnswers[q.id];
      document.getElementById(`lbl-${q.id}-${q.correctAnswer}`).classList.add("correct-ans");
      if (selected === q.correctAnswer) { totalScore += 0.25; diemPhan1 += 0.25; }
      else if (selected !== undefined) document.getElementById(`lbl-${q.id}-${selected}`).classList.add("wrong-ans");
    } else if (q.part === 2) {
      let cCount = 0;
      q.statements.forEach((stmt, idx) => {
        const row = document.getElementById(`row-${q.id}-${idx}`);
        const ans = userAnswers[q.id] ? userAnswers[q.id][idx] : null;
        if (ans === stmt.correct.toString()) { cCount++; row.classList.add("correct-ans"); }
        else if (ans !== null) row.classList.add("wrong-ans");
      });
      if (cCount === 4) { totalScore += 1.0; diemPhan2 += 1.0; }
      else if (cCount === 3) { totalScore += 0.5; diemPhan2 += 0.5; }
      else if (cCount === 2) { totalScore += 0.25; diemPhan2 += 0.25; }
    } else if (q.part === 3) {
      const input = document.querySelector(`input[name="ans-${q.id}"]`);
      const userVal = (userAnswers[q.id] || "").trim().toLowerCase();
      const correct = q.correctAnswer.toLowerCase();
      if (userVal === correct || userVal === correct.replace(".", ",")) {
        totalScore += 0.25; diemPhan3 += 0.25; input.classList.add("correct-ans");
      } else { input.classList.add("wrong-ans"); }
    }
  });

  const scorePill = document.getElementById("score-pill");
  document.querySelector(".timer-pill")?.classList.add("hidden");
  if (scorePill) { scorePill.classList.remove("hidden"); document.getElementById("review-score").innerText = totalScore.toFixed(2); }

  saveExamResultToFirebase(diemPhan1, diemPhan2, diemPhan3, totalScore, cheatCount);
  document.getElementById("final-score").innerText = totalScore.toFixed(2);
  document.getElementById("cheat-display").innerText = cheatCount;
  examScreen.classList.add("hidden"); resultScreen.classList.remove("hidden");
  localStorage.removeItem(DRAFT_KEY);
}

async function saveExamResultToFirebase(diemPhan1, diemPhan2, diemPhan3, tongDiem, soLanThoat) {
  const statusEl = document.getElementById("firebase-status");
  if (statusEl) statusEl.innerText = "⏳ Đang đồng bộ kết quả lên MTSedu...";
  try {
    const session = getMTSeduSession();
    const userId = session ? session.id : null;
    const resultData = {
      hoTen: studentName, lop: studentClass, maDe: MA_DE,
      diemPhan1, diemPhan2, diemPhan3, tongDiem, soLanThoat,
      userId: userId || "unknown",
      thoiGianNop: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    };
    const updates = {};
    const newResultId = push(ref(db, `testResults/${MA_DE}`)).key;
    updates[`testResults/${MA_DE}/${newResultId}`] = resultData;
    if (userId) updates[`users/${userId}/results/${newResultId}`] = resultData;
    await update(ref(db), updates);
    if (statusEl) { statusEl.style.color = "green"; statusEl.innerText = "✅ Kết quả đã được đồng bộ thành công!"; }
  } catch (error) {
    if (statusEl) { statusEl.style.color = "red"; statusEl.innerText = "❌ Lỗi: " + error.message; }
  }
}

document.getElementById("review-btn").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
