import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TextBody = () => {
  const inputRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);

  const {
    currentText,
    mode,
    difficulty,
    isActive,
    setIsActive,
    timeLeft,
    setTimeLeft,
    setStats,
    stats,
    setPersonalBest,
    personalBest,
  } = useAppContext();
  const navigate = useNavigate();

  const characters = (currentText || "").split("");

  const correctChars = userInput
    .split("")
    .filter((char, index) => char === characters[index]).length;

  const accuracy =
    userInput.length > 0
      ? Math.max(
          0,
          Math.round(
            ((userInput.length - stats.mistakes) / userInput.length) * 100,
          ),
        )
      : 100;

  const elapsedTime =
    mode === "Time(60s)"
      ? (60 - timeLeft) / 60
      : startTime
        ? (Date.now() - startTime) / 1000 / 60
        : 0;

  const wpm = elapsedTime > 0 ? Math.round(correctChars / 5 / elapsedTime) : 0;

  const stateHold = () => {
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("mode", mode);
    setIsActive(true);
    return;
  };

  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      accuracy,
      correctChars,
      wpm,
    }));
  }, [accuracy, correctChars, wpm, setStats]);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (!isActive && e.key === "Enter") {
        stateHold();
      }
    };

    window.addEventListener("keydown", handleEnterPress);

    if (isFinished) {
      navigate("/result");
      if (personalBest < stats.wpm) {
        setPersonalBest(stats.wpm);
      }
      return;
    }

    if (mode !== "Time(60s)" || !isActive) {
      return;
    }

    if (timeLeft <= 0) {
      setIsActive(false);
      setIsFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => (
      window.removeEventListener("keydown", handleEnterPress),
      clearInterval(timer)
    );
  }, [
    isActive,
    mode,
    isFinished,
    timeLeft,
    setTimeLeft,
    setIsActive,
    navigate,
  ]);

  useEffect(() => {
    setUserInput("");
    setIsFinished(false);
    setStartTime(null);
    setStats((prev) => ({ ...prev, mistakes: 0 }));
    setTimeLeft(60);
    inputRef.current?.focus();
  }, [currentText, mode, setTimeLeft]);

  const handleTyping = (e) => {
    if (!isActive) return;
    const value = e.target.value;

    if (value.length > userInput.length) {
      const currentIndex = value.length - 1;

      if (value[currentIndex] !== characters[currentIndex]) {
        setStats((prev) => ({ ...prev, mistakes: prev.mistakes + 1 }));
      }
    }

    if (value.length <= characters.length) {
      setUserInput(value);
    }

    if (value.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (value.length === (currentText || "").length) {
      setIsActive(false);
      setIsFinished(true);
    }
  };

  return (
    <div
      className="min-h-[65vh] relative"
      onClick={() => inputRef.current?.focus()}
    >
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <button
            onClick={stateHold}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-400 transition"
          >
            Start Typing Test
          </button>
          <p className="text-lg text-neutral-0 mt-4">or click Enter to start</p>
        </div>
      )}

      <input
        id="typing"
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleTyping}
        onPaste={(e) => e.preventDefault()}
        className="absolute inset-0 opacity-0 cursor-default"
        autoFocus
      />

      <div
        className={`whitespace-pre-wrap text-2xl leading-10 flex flex-wrap transition-all duration-200 ${
          !isActive ? "blur-xs opacity-50" : "blur-0 opacity-100"
        }`}
      >
        {characters.map((char, index) => {
          let color = "text-neutral-500";

          if (index < userInput.length) {
            color = userInput[index] === char ? "text-white" : "text-red-500";
          }

          return (
            <span key={index} className={`relative ${color}`}>
              {char}

              {/* Cursor */}
              {index === userInput.length && (
                <span className="absolute left-0 top-0 w-0.5 h-full bg-blue-400 animate-pulse" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TextBody;
