// --- TRÒ 1: GIEO QUẺ ---
const danhSachQue = [
    "🧧 ĐẠI CÁT: Năm nay được Tiểu đội trưởng lì xì to!",
    "💔 TÌNH DUYÊN: Người yêu cũ sẽ nhắn tin... đòi nợ.",
    "👮 SỰ NGHIỆP: Sắp được thăng chức lên... Trực ban trưởng.",
    "💀 HUNG TIN: Coi chừng bị gác đêm Giao Thừa.",
    "🌸 MAY MẮN: Ra đường lượm được 2 ngàn.",
    "🤐 KHẨU NGHIỆP: Bớt chém gió kẻo bị anh em úp sọt."
];

function xinQue() {
    var resultBox = document.getElementById("que-result");
    resultBox.style.display = "block";
    resultBox.innerHTML = "🎲 Đang lắc... Chờ tí...";
    setTimeout(function() {
        var soNgauNhien = Math.floor(Math.random() * danhSachQue.length);
        resultBox.innerHTML = danhSachQue[soNgauNhien];
    }, 1000);
}

// --- TRÒ 2: VÒNG QUAY ---
let spinning = false;
function quaySo() {
    if (spinning) return;
    spinning = true;
    const wheel = document.getElementById("vong-quay");
    const deg = Math.floor(3600 + Math.random() * 3600); 
    wheel.style.transform = `rotate(${deg}deg)`;
    setTimeout(() => {
        spinning = false;
        alert("Dừng hình! Thực hiện hình phạt đi đồng chí! 😎");
    }, 4000); 
}

// --- TRÒ 3: QUIZ ---
const boCauHoi = [
    { q: "Ai là người tắm lâu nhất Tiểu đội?", a: ["Đồng chí A", "Đồng chí B", "Đồng chí C"], correct: 1 },
    { q: "Câu cửa miệng của Tiểu đội trưởng là gì?", a: ["Nghiêm!", "Tác phong lên", "Hết giờ!"], correct: 0 },
    { q: "Đặc sản bếp ăn đơn vị?", a: ["Cá khô", "Rau luộc", "Canh đại dương"], correct: 2 }
];
let currentQ = 0;

function loadQuestion() {
    if (currentQ >= boCauHoi.length) {
        document.getElementById("quiz-container").innerHTML = "<h4>🎉 Hết câu hỏi!</h4>";
        document.getElementById("btn-next").style.display = "none";
        return;
    }
    const qData = boCauHoi[currentQ];
    document.getElementById("question-text").innerText = "Câu " + (currentQ + 1) + ": " + qData.q;
    const answersDiv = document.getElementById("answers-box");
    answersDiv.innerHTML = "";
    qData.a.forEach((ans, index) => {
        const btn = document.createElement("button");
        btn.innerText = ans; btn.className = "btn-answer";
        btn.onclick = () => checkAnswer(index, qData.correct, btn);
        answersDiv.appendChild(btn);
    });
    document.getElementById("quiz-feedback").innerText = "";
    document.getElementById("btn-next").style.display = "none";
}

function checkAnswer(userIndex, correctIndex, btnElement) {
    const allBtns = document.querySelectorAll(".btn-answer");
    allBtns.forEach(b => b.disabled = true);
    if (userIndex === correctIndex) {
        btnElement.classList.add("correct");
        document.getElementById("quiz-feedback").innerText = "✅ Chuẩn!";
    } else {
        btnElement.classList.add("wrong");
        allBtns[correctIndex].classList.add("correct");
        document.getElementById("quiz-feedback").innerText = "❌ Sai bét!";
    }
    document.getElementById("btn-next").style.display = "inline-block";
}

function nextQuestion() { currentQ++; loadQuestion(); }
window.onload = loadQuestion;