import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";
import Leaderboard from "./components/Leaderboard";
import axios from "axios";

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get("https://api.jsonserve.com/Uw5CrX")
      .then((res) => setQuizData(res.data))
      .catch((err) => console.error("Error fetching quiz data:", err));
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(10);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
    } else {
      setQuizCompleted(true);
      saveLeaderboard(score);
    }
  };

  const saveLeaderboard = (finalScore) => {
    const newLeaderboard = [...leaderboard, { name: "Player", score: finalScore }];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/" element={<QuizStart startQuiz={startQuiz} />} />
          <Route path="/quiz" element={<QuizQuestion questionData={quizData[currentQuestion]} handleAnswer={handleAnswer} timeLeft={timeLeft} />} />
          <Route path="/result" element={<QuizResult score={score} total={quizData.length} />} />
          <Route path="/leaderboard" element={<Leaderboard leaderboard={leaderboard} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
