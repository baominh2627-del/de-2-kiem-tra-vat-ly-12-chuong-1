export const examData = [

  // ======== PHẦN 1: TRẮC NGHIỆM KHÁCH QUAN (12 câu × 0.25đ = 3.0đ) ========
  {
    id: "p1_1",
    part: 1,
    question: "Nhiệt độ tuyệt đối $0\\,\\text{K}$ tương ứng với bao nhiêu độ Celsius?",
    options: ["$-273°\\text{C}$", "$0°\\text{C}$", "$273°\\text{C}$", "$-373°\\text{C}$"],
    correctAnswer: 0,
    explanation: "Nhiệt độ tuyệt đối 0 K = $-273°$C (chính xác là $-273.15°$C). Công thức: $T(K) = t(°C) + 273$.",
    image: null
  },
  {
    id: "p1_2",
    part: 1,
    question: "Quá trình đẳng nhiệt là quá trình biến đổi trạng thái trong đó:",
    options: [
      "Nhiệt độ không đổi",
      "Áp suất không đổi",
      "Thể tích không đổi",
      "Nội năng không đổi"
    ],
    correctAnswer: 0,
    explanation: "Quá trình đẳng nhiệt là quá trình biến đổi trạng thái của khí mà nhiệt độ được giữ không đổi ($T = \\text{const}$).",
    image: null
  },
  {
    id: "p1_3",
    part: 1,
    question: "Định luật Boyle-Mariotte phát biểu: Với một lượng khí xác định ở nhiệt độ không đổi, tích của áp suất và thể tích là:",
    options: [
      "Không đổi",
      "Tăng khi áp suất tăng",
      "Giảm khi thể tích tăng",
      "Tỉ lệ thuận với nhiệt độ"
    ],
    correctAnswer: 0,
    explanation: "Định luật Boyle: $pV = \\text{const}$ khi $T = \\text{const}$. Tức là $p_1V_1 = p_2V_2$.",
    image: null
  },
  {
    id: "p1_4",
    part: 1,
    question: "Một khối khí có thể tích $V_1 = 2\\,\\text{L}$ ở áp suất $p_1 = 1\\,\\text{atm}$. Khi nén đẳng nhiệt đến thể tích $V_2 = 0.5\\,\\text{L}$, áp suất $p_2$ là:",
    options: ["$4\\,\\text{atm}$", "$2\\,\\text{atm}$", "$0.25\\,\\text{atm}$", "$8\\,\\text{atm}$"],
    correctAnswer: 0,
    explanation: "Theo định luật Boyle: $p_2 = \\dfrac{p_1 V_1}{V_2} = \\dfrac{1 \\times 2}{0.5} = 4\\,\\text{atm}$.",
    image: null
  },
  {
    id: "p1_5",
    part: 1,
    question: "Quá trình đẳng áp tuân theo định luật:",
    options: [
      "Charles (Gay-Lussac 1)",
      "Boyle-Mariotte",
      "Gay-Lussac 2",
      "Avogadro"
    ],
    correctAnswer: 0,
    explanation: "Định luật Charles: $\\dfrac{V}{T} = \\text{const}$ khi áp suất không đổi (đẳng áp).",
    image: null
  },
  {
    id: "p1_6",
    part: 1,
    question: "Nội năng của một vật là:",
    options: [
      "Tổng động năng và thế năng của các phân tử cấu tạo nên vật",
      "Tổng động năng và thế năng của vật",
      "Nhiệt lượng vật nhận được",
      "Công vật thực hiện lên môi trường"
    ],
    correctAnswer: 0,
    explanation: "Nội năng $U$ là tổng động năng và thế năng của tất cả các phân tử cấu tạo nên vật (không phải của cả vật).",
    image: null
  },
  {
    id: "p1_7",
    part: 1,
    question: "Nguyên lý I nhiệt động lực học được biểu diễn bởi phương trình:",
    options: [
      "$\\Delta U = Q + A$",
      "$\\Delta U = Q - A$",
      "$\\Delta U = A - Q$",
      "$\\Delta U = Q \\cdot A$"
    ],
    correctAnswer: 0,
    explanation: "Nguyên lý I: $\\Delta U = Q + A$, trong đó $Q$ là nhiệt lượng vật nhận, $A$ là công vật nhận được từ ngoài. (Quy ước: $A < 0$ khi vật thực hiện công ra ngoài.)",
    image: null
  },
  {
    id: "p1_8",
    part: 1,
    question: "Trong quá trình đẳng tích, công thực hiện bởi khí bằng:",
    options: ["$0$", "$pV$", "$nRT$", "$\\Delta U$"],
    correctAnswer: 0,
    explanation: "Đẳng tích: $V = \\text{const}$ nên $\\Delta V = 0$, do đó $A = p\\Delta V = 0$.",
    image: null
  },
  {
    id: "p1_9",
    part: 1,
    question: "Entropy là đại lượng đặc trưng cho:",
    options: [
      "Mức độ hỗn loạn của hệ",
      "Nhiệt lượng của hệ",
      "Công của hệ",
      "Nội năng của hệ"
    ],
    correctAnswer: 0,
    explanation: "Entropy $S$ là đại lượng đặc trưng cho mức độ hỗn loạn (vô trật tự) của hệ. Entropy luôn tăng trong các quá trình tự nhiên (nguyên lý II).",
    image: null
  },
  {
    id: "p1_10",
    part: 1,
    question: "Hiệu suất của động cơ nhiệt lý tưởng (Carnot) tính theo công thức:",
    options: [
      "$\\eta = 1 - \\dfrac{T_2}{T_1}$",
      "$\\eta = 1 + \\dfrac{T_2}{T_1}$",
      "$\\eta = \\dfrac{T_1}{T_2}$",
      "$\\eta = \\dfrac{T_2}{T_1}$"
    ],
    correctAnswer: 0,
    explanation: "Hiệu suất Carnot: $\\eta = 1 - \\dfrac{T_2}{T_1}$ với $T_1$ là nhiệt độ nguồn nóng, $T_2$ là nhiệt độ nguồn lạnh (đơn vị K).",
    image: null
  },
  {
    id: "p1_11",
    part: 1,
    question: "Phân tử khí lý tưởng có đặc điểm:",
    options: [
      "Tương tác nhau chỉ khi va chạm, thể tích bản thân bằng 0",
      "Có lực hút mạnh giữa các phân tử",
      "Thể tích bản thân lớn so với bình chứa",
      "Chuyển động đều theo một chiều"
    ],
    correctAnswer: 0,
    explanation: "Khí lý tưởng: các phân tử là chất điểm (thể tích bản thân $\\approx 0$), chỉ tương tác với nhau khi va chạm đàn hồi.",
    image: null
  },
  {
    id: "p1_12",
    part: 1,
    question: "Một xilanh chứa khí ở $27°\\text{C}$. Nung nóng đẳng áp đến $127°\\text{C}$, thể tích khí thay đổi theo tỉ lệ:",
    options: [
      "$V_2 = \\dfrac{4}{3}V_1$",
      "$V_2 = \\dfrac{3}{4}V_1$",
      "$V_2 = 2V_1$",
      "$V_2 = \\dfrac{127}{27}V_1$"
    ],
    correctAnswer: 0,
    explanation: "Đẳng áp: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$. $T_1 = 300\\,\\text{K}$, $T_2 = 400\\,\\text{K}$. $V_2 = V_1 \\cdot \\dfrac{400}{300} = \\dfrac{4}{3}V_1$.",
    image: null
  },

  // ======== PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI (4 câu × 1đ = 4.0đ) ========
  {
    id: "p2_1",
    part: 2,
    question: "Cho một khối khí lý tưởng thực hiện chu trình Carnot giữa hai nguồn nhiệt $T_1 = 500\\,\\text{K}$ và $T_2 = 300\\,\\text{K}$. Xét các phát biểu sau:",
    statements: [
      { text: "Hiệu suất của chu trình này là $40\\%$.", correct: true },
      { text: "Hiệu suất của động cơ nhiệt thực tế luôn nhỏ hơn hiệu suất Carnot.", correct: true },
      { text: "Chu trình Carnot gồm 4 quá trình: 2 đoạn nhiệt và 2 đẳng áp.", correct: false },
      { text: "Entropy của hệ cô lập luôn không giảm.", correct: true }
    ],
    explanation: "a) $\\eta = 1 - \\frac{300}{500} = 0.4 = 40\\%$ ✓. b) Động cơ thực có tổn thất nên $\\eta_{\\text{thực}} < \\eta_{\\text{Carnot}}$ ✓. c) Sai — Carnot gồm 2 đẳng nhiệt và 2 đoạn nhiệt, không phải đẳng áp. d) Nguyên lý II: $\\Delta S \\geq 0$ ✓."
  },
  {
    id: "p2_2",
    part: 2,
    question: "Một bình kín chứa khí lý tưởng ở trạng thái $(p_0, V_0, T_0)$. Người ta thực hiện quá trình nén đẳng nhiệt đến thể tích $\\dfrac{V_0}{2}$. Xét các phát biểu:",
    statements: [
      { text: "Áp suất khí sau khi nén là $2p_0$.", correct: true },
      { text: "Nội năng khí thay đổi sau khi nén.", correct: false },
      { text: "Trong quá trình nén đẳng nhiệt, khí nhả nhiệt ra môi trường.", correct: true },
      { text: "Công ngoại lực thực hiện lên khí trong quá trình nén là âm.", correct: false }
    ],
    explanation: "a) Boyle: $p_2 = \\frac{p_0 V_0}{V_0/2} = 2p_0$ ✓. b) Đẳng nhiệt → $T$ không đổi → $\\Delta U = 0$ (khí lý tưởng) ✗. c) $\\Delta U = 0$, ngoại lực sinh công dương → khí nhả nhiệt $Q < 0$ ✓. d) Ngoại lực nén khí → công ngoại lực thực hiện lên khí là dương ✗."
  },
  {
    id: "p2_3",
    part: 2,
    question: "Về nhiệt động lực học và nội năng, hãy xét các phát biểu:",
    statements: [
      { text: "Nội năng của vật phụ thuộc vào nhiệt độ và thể tích của vật.", correct: true },
      { text: "Có thể truyền nhiệt từ vật lạnh sang vật nóng mà không cần tốn công.", correct: false },
      { text: "Nguyên lý I nhiệt động lực học là sự mở rộng của định luật bảo toàn năng lượng.", correct: true },
      { text: "Trong quá trình đẳng tích, nhiệt lượng cung cấp chỉ làm tăng nội năng.", correct: true }
    ],
    explanation: "a) Nội năng $U$ phụ thuộc $T$ (động năng phân tử) và $V$ (thế năng phân tử) ✓. b) Sai — nguyên lý II: nhiệt tự nhiên chỉ truyền từ nóng sang lạnh ✗. c) Nguyên lý I là dạng đặc biệt của bảo toàn năng lượng ✓. d) Đẳng tích: $A = 0$ → $\\Delta U = Q$ ✓."
  },
  {
    id: "p2_4",
    part: 2,
    question: "Về thuyết động học phân tử chất khí, xét các phát biểu:",
    statements: [
      { text: "Nhiệt độ tuyệt đối tỉ lệ với động năng trung bình của phân tử khí.", correct: true },
      { text: "Ở cùng nhiệt độ, các phân tử khí nhẹ hơn chuyển động nhanh hơn.", correct: true },
      { text: "Áp suất khí tác dụng lên thành bình do trọng lực các phân tử gây ra.", correct: false },
      { text: "Số phân tử trong 1 mol chất bằng $6.022 \\times 10^{23}$ (số Avogadro).", correct: true }
    ],
    explanation: "a) $\\bar{\\varepsilon} = \\frac{3}{2}k_BT$ → $T \\propto \\bar{\\varepsilon}$ ✓. b) $\\bar{\\varepsilon} = \\frac{1}{2}mv^2$ → $v \\propto \\frac{1}{\\sqrt{m}}$, khí nhẹ hơn chuyển động nhanh hơn ✓. c) Sai — áp suất do va chạm của phân tử vào thành bình, không phải trọng lực ✗. d) Số Avogadro $N_A = 6.022 \\times 10^{23}\\,\\text{mol}^{-1}$ ✓."
  },

  // ======== PHẦN 3: TRẢ LỜI NGẮN (6 câu × 0.5đ = 3.0đ) ========
  {
    id: "p3_1",
    part: 3,
    question: "Một khối khí lý tưởng ở $27°\\text{C}$ có áp suất $2\\,\\text{atm}$ và thể tích $3\\,\\text{L}$. Nung nóng đẳng áp đến $127°\\text{C}$. Thể tích khí lúc sau (đơn vị: lít) bằng bao nhiêu?",
    correctAnswer: "4",
    explanation: "$T_1 = 300\\,\\text{K}$, $T_2 = 400\\,\\text{K}$. Đẳng áp: $V_2 = V_1 \\cdot \\dfrac{T_2}{T_1} = 3 \\times \\dfrac{400}{300} = 4\\,\\text{L}$.",
    image: null
  },
  {
    id: "p3_2",
    part: 3,
    question: "Hiệu suất (tính theo %) của động cơ nhiệt lý tưởng hoạt động giữa nguồn nóng $600\\,\\text{K}$ và nguồn lạnh $300\\,\\text{K}$ là bao nhiêu?",
    correctAnswer: "50",
    explanation: "$\\eta = \\left(1 - \\dfrac{T_2}{T_1}\\right) \\times 100\\% = \\left(1 - \\dfrac{300}{600}\\right) \\times 100\\% = 50\\%$.",
    image: null
  },
  {
    id: "p3_3",
    part: 3,
    question: "Một khối khí nhận nhiệt lượng $Q = 500\\,\\text{J}$ và sinh công $A = 200\\,\\text{J}$. Độ biến thiên nội năng $\\Delta U$ (đơn vị: J) bằng bao nhiêu?",
    correctAnswer: "300",
    explanation: "Nguyên lý I: $\\Delta U = Q - A = 500 - 200 = 300\\,\\text{J}$. (Ở đây $A$ là công khí thực hiện ra ngoài.)",
    image: null
  },
  {
    id: "p3_4",
    part: 3,
    question: "Nhiệt độ Celsius tương ứng với $373\\,\\text{K}$ bằng bao nhiêu? (đơn vị: °C)",
    correctAnswer: "100",
    explanation: "$t = T - 273 = 373 - 273 = 100°\\text{C}$.",
    image: null
  },
  {
    id: "p3_5",
    part: 3,
    question: "Một bình kín chứa khí ở $27°\\text{C}$, áp suất $1\\,\\text{atm}$. Đun nóng đẳng tích đến $327°\\text{C}$, áp suất khí (đơn vị: atm) bằng bao nhiêu?",
    correctAnswer: "2",
    explanation: "$T_1 = 300\\,\\text{K}$, $T_2 = 600\\,\\text{K}$. Đẳng tích: $\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}$ → $p_2 = 1 \\times \\dfrac{600}{300} = 2\\,\\text{atm}$.",
    image: null
  },
  {
    id: "p3_6",
    part: 3,
    question: "Phương trình trạng thái khí lý tưởng: $pV = nRT$. Cho $n = 1\\,\\text{mol}$, $T = 300\\,\\text{K}$, $R = 8.314\\,\\text{J/(mol·K)}$. Tích $pV$ (đơn vị: J) bằng bao nhiêu? (làm tròn đến hàng đơn vị)",
    correctAnswer: "2494",
    explanation: "$pV = nRT = 1 \\times 8.314 \\times 300 = 2494.2\\,\\text{J} \\approx 2494\\,\\text{J}$.",
    image: null
  },
];
