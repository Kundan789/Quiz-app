import React from "react";

const QuizQuestion = ({ questionData, handleAnswer, timeLeft }) => {
  if (!questionData) return <p>Loading...</p>;

  return (
    <div>
      <h2>{questionData.question}</h2>
      <p>Time Left: {timeLeft} seconds</p>
      {questionData.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option.isCorrect)}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default QuizQuestion;
