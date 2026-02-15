import { createContext, useContext, useEffect, useState } from "react";
import texts from "../data/data.json";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Time(60s)");
  const difficulties = ["Easy", "Medium", "Hard"];
  const modes = ["Time(60s)", "Passage"];
  const [personalBest, setPersonalBest] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    mistakes: 0,
  });

  const getRandomText = (level) => {
    const selectedArray = texts[level.toLowerCase()];
    const randomIndex = Math.floor(Math.random() * selectedArray.length);
    return selectedArray[randomIndex].text;
  };

  const restartTest = (soft = true) => {
    setCurrentText(getRandomText(difficulty));
    setIsActive(soft);
  };

  const beatThisScore = () => {
    navigate("/");
    setCurrentText(getRandomText(localStorage.getItem("difficulty")));
    setDifficulty(localStorage.getItem("difficulty"));
    setMode(localStorage.getItem("mode"));
    setIsActive(true);
  };
  useEffect(() => {
    setCurrentText(getRandomText(difficulty));
    restartTest(false);
  }, [difficulty, mode]);

  useEffect(() => {
    const best = localStorage.getItem("personalBest");
    if (best) {
      setPersonalBest(best);
    } else {
      localStorage.setItem("personalBest", personalBest);
    }
  }, []);

  const values = {
    difficulties,
    modes,
    difficulty,
    setDifficulty,
    setMode,
    mode,
    currentText,
    isActive,
    setIsActive,
    timeLeft,
    setTimeLeft,
    restartTest,
    stats,
    setStats,
    beatThisScore,
    personalBest,
    setPersonalBest,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  try {
    return useContext(AppContext);
  } catch (error) {
    console.log(error);
  }
};
