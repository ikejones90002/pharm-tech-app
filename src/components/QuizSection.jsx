import { useEffect, useState } from "react";

const exams = {
  ptce: [
    {
      question: "What percent of the PTCE covers medication topics?",
      options: ["12.5%", "21.25%", "26.25%", "40%"],
      answer: "40%",
    },
  ],
  excpt: [
    {
      question: "How many scored questions are on the ExCPT?",
      options: ["100", "120", "110", "140"],
      answer: "100",
    },
  ],
  cspt: [
    {
      question: "What percent of the CSPT exam is about Sterile Compounding Procedures?",
      options: ["17%", "22%", "53%", "8%"],
      answer: "53%",
    },
  ],
};

export default function QuizSection() {
  const [type, setType] = useState("ptce");
  const [quizData, setQuizData] = useState(exams.ptce);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ total: 0, correct: 0 });
  const [timeLeft, setTimeLeft] = useState(10);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setQuizData(exams[type]);
    setCurrent(0);
    setResult("");
  }, [type]);

  useEffect(() => {
    const saved = localStorage.getItem("quizStats");
    if (saved) setScore(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("quizStats", JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleAnswer(null);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current]);

  const handleAnswer = (opt) => {
    const question = quizData[current];
    const isCorrect = opt === question.answer;
    const newScore = {
      total: score.total + 1,
      correct: score.correct + (isCorrect ? 1 : 0),
    };
    setScore(newScore);
    setHistory((prev) => [
      ...prev,
      {
        question: question.question,
        selected: opt,
        correct: question.answer,
        isCorrect,
      },
    ]);
    setResult(
      opt === null
        ? `⏱ Time's up! Answer: ${question.answer}`
        : isCorrect
        ? "✅ Correct!"
        : `❌ Answer: ${question.answer}`
    );
  };

  const next = () => {
    setCurrent((c) => (c + 1) % quizData.length);
    setResult("");
    setTimeLeft(10);
  };

  const resetScore = () => {
    localStorage.removeItem("quizStats");
    setScore({ total: 0, correct: 0 });
    setHistory([]);
    setResult("Score reset.");
  };

  return (
    <div className="section">
      <h2>Certification Quiz</h2>
      <label>
        Choose Exam:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ptce">PTCE</option>
          <option value="excpt">ExCPT</option>
          <option value="cspt">CSPT</option>
        </select>
      </label>
      <div id="quiz-box">
        <div className="quiz-question">{quizData[current].question}</div>
        <div className="quiz-options">
          {quizData[current].options.map((opt) => (
            <button key={opt} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
        <div className="result">
          {result} <br /> 📊 Score: {score.correct}/{score.total}
        </div>
      </div>
      <button onClick={next}>Next Question</button>
      <button onClick={resetScore}>Reset Score</button>

      {history.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Scoreboard</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {history.map((entry, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Q:</strong> {entry.question} <br />
                <strong>Your Answer:</strong> {entry.selected || "None"} <br />
                <strong>Correct Answer:</strong> {entry.correct} <br />
                <strong>Result:</strong> {entry.isCorrect ? "✅" : "❌"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
