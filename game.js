/* --- LOGIC CHO PHẦN THỬ TÀI XÔNG ĐẤT --- */
// Danh sách quà tặng theo yêu cầu
const phanThuongXongDat = [
    "👏 1 Tràng pháo tay giòn giã!",
    "🤝 Được bắt tay với Lớp Trưởng!",
    "👩‍🏫 Vinh dự bắt tay với Cô Giáo!"
];

function checkXongDat(answer) {
    // Ẩn bảng câu hỏi để người dùng không chọn lại
    document.getElementById('quiz-box').style.display = 'none';
    
    // Hiện khu vực kết quả
    const resultArea = document.getElementById('result-area');
    const wrongMsg = document.getElementById('wrong-msg');
    const rightMsg = document.getElementById('right-msg');
    
    resultArea.style.display = 'block';

    if (answer === 'B') {
        // Nếu đúng (Đáp án B)
        rightMsg.style.display = 'block';
        wrongMsg.style.display = 'none';
    } else {
        // Nếu sai
        wrongMsg.style.display = 'block';
        rightMsg.style.display = 'none';
    }
}

function moQuaXongDat() {
    const giftText = document.getElementById('gift-result');
    const btn = document.getElementById('btn-mo-qua');
    
    // Tạo hiệu ứng random nhảy chữ
    let count = 0;
    btn.disabled = true; // Khóa nút không cho bấm liên tục
    btn.innerText = "Đang bốc quẻ...";

    const interval = setInterval(() => {
        // Lấy ngẫu nhiên 1 món quà để hiển thị nhấp nháy
        const randomIndex = Math.floor(Math.random() * phanThuongXongDat.length);
        giftText.innerText = phanThuongXongDat[randomIndex];
        count++;

        // Sau 20 lần nháy thì dừng lại ở kết quả cuối cùng
        if (count > 20) {
            clearInterval(interval);
            // Chọn quà chốt hạ
            const finalGift = phanThuongXongDat[Math.floor(Math.random() * phanThuongXongDat.length)];
            giftText.innerText = "🎁 " + finalGift + " 🎁";
            giftText.style.fontSize = "1.8em";
            giftText.style.color = "#fff";
            btn.style.display = "none"; // Ẩn nút đi
        }
    }, 100); // Tốc độ nháy 100ms
}
// Hàm xử lý khi bấm nút "Thử Lại"
function thuLai() {
    // 1. Ẩn khu vực kết quả đi
    document.getElementById('result-area').style.display = 'none';
    
    // 2. Hiện lại bảng câu hỏi
    document.getElementById('quiz-box').style.display = 'block';
    
    // 3. (Tùy chọn) Có thể thêm hiệu ứng cuộn lại lên phần câu hỏi nếu cần
    document.getElementById('quiz-box').scrollIntoView({ behavior: 'smooth' });
}
/* --- LOGIC CHO QUIZ TỔNG KẾT (7 CÂU) - ĐÃ TÁCH BIỆT --- */

const finalQuizData = [
    {
        question: "Câu 1: Tết Nguyên Đán được tính theo loại lịch nào?",
        answers: ["A. Dương lịch", "B. Âm lịch", "C. Cả hai loại trên"],
        correct: 1
    },
    {
        question: "Câu 2: Nghi lễ tiễn Ông Công, Ông Táo về trời diễn ra vào ngày nào?",
        answers: ["A. 23 tháng Chạp", "B. 30 Tết", "C. Mùng 1 Tết"],
        correct: 0
    },
    {
        question: "Câu 3: Theo phong tục, ai là người nên xông đất đầu năm để mang lại may mắn?",
        answers: ["A. Người có tuổi hợp với gia chủ", "B. Người bước vào nhà đầu tiên sau giao thừa", "C. Cả A và B đều đúng"],
        correct: 2
    },
    {
        question: "Câu 4: Mâm ngũ quả miền Nam thường có 5 loại quả nào?",
        answers: ["A. Chuối, bưởi, đào, hồng, quýt", "B. Mãng cầu, dừa, đu đủ, xoài, sung", "C. Dưa hấu, táo, cam, nho, chuối"],
        correct: 1
    },
    {
        question: "Câu 5: Loại bánh truyền thống không thể thiếu ở miền Bắc dịp Tết là gì?",
        answers: ["A. Bánh tét", "B. Bánh chưng", "C. Bánh giầy"],
        correct: 1
    },
    {
        question: "Câu 6: Câu đối đỏ và ông đồ là nét văn hóa đặc trưng của Tết ở đâu?",
        answers: ["A. Đình, chùa, phố ông đồ", "B. Chỉ ở miền Nam", "C. Chỉ ở nhà thờ họ"],
        correct: 0
    },
    {
        question: "Câu 7: Ý nghĩa chính của việc lì xì (mừng tuổi) đầu năm là gì?",
        answers: ["A. Khoe tiền", "B. Trả nợ", "C. Chúc may mắn, sức khỏe và lộc xuân"],
        correct: 2
    }
];

let fCurrentIdx = 0;
let fIsLocked = false;

// Hàm hiển thị câu hỏi
function renderFinalQuestion() {
    const q = finalQuizData[fCurrentIdx];
    
    // Cập nhật số câu và nội dung
    document.getElementById('final-q-number').innerText = `Câu ${fCurrentIdx + 1}/${finalQuizData.length}`;
    document.getElementById('final-q-text').innerText = q.question;
    
    // Xóa đáp án cũ
    const optionsDiv = document.getElementById('final-options-area');
    optionsDiv.innerHTML = '';
    document.getElementById('final-feedback').innerText = '';
    fIsLocked = false;

    // Tạo nút đáp án mới
    q.answers.forEach((ans, index) => {
        const btn = document.createElement('button');
        btn.className = 'final-btn'; // Class riêng của khối này
        btn.innerText = ans;
        btn.onclick = () => checkFinalAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

// Hàm kiểm tra đáp án
function checkFinalAnswer(selectedIndex, btnElement) {
    if (fIsLocked) return;
    fIsLocked = true;

    const correctIndex = finalQuizData[fCurrentIdx].correct;
    // Chỉ tìm các nút trong khu vực đáp án của khối này
    const allBtns = document.getElementById('final-options-area').querySelectorAll('.final-btn');
    const feedback = document.getElementById('final-feedback');

    if (selectedIndex === correctIndex) {
        // ĐÚNG
        btnElement.classList.add('correct');
        feedback.innerHTML = "🎉 <strong>Chính xác!</strong>";
        feedback.style.color = "#4CAF50";
    } else {
        // SAI
        btnElement.classList.add('wrong'); // Đỏ nút sai
        if (allBtns[correctIndex]) {
            allBtns[correctIndex].classList.add('correct'); // Xanh nút đúng
        }
        
        // Hiện đáp án đúng
        const rightText = finalQuizData[fCurrentIdx].answers[correctIndex];
        feedback.innerHTML = `😅 <strong>Sai rồi!</strong> Đáp án là: <br>${rightText}`;
        feedback.style.color = "#FFD700";
    }
}

// Hàm chuyển câu
function changeFinalQuestion(direction) {
    fCurrentIdx += direction;
    if (fCurrentIdx < 0) fCurrentIdx = finalQuizData.length - 1;
    if (fCurrentIdx >= finalQuizData.length) fCurrentIdx = 0;
    renderFinalQuestion();
}

// Khởi chạy
document.addEventListener('DOMContentLoaded', renderFinalQuestion);