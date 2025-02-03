import React from "react";

const QuizStart = ({ startQuiz }) => {
  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;
