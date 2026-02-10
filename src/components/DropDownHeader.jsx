import { useState } from "react";
import assets from "../assets/assets";

const DropDownHeader = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Time(60s)");
  const [diffIsOpen, setDiffIsOpen] = useState(false);
  const [modeIsOpen, setModeIsOpen] = useState(false);

  const btnClass = (id) => {
    return mode === id || difficulty === id ? "active-effect" : "";
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between text-sm">
      <div className="lg:flex items-center gap-3 text-[16px] text-neutral-0 grid grid-cols-11">
        <div className="lg:flex gap-2 text-center col-span-3">
          <span className=" text-neutral-400">WPM: </span>
          <p className="font-semibold text-3xl lg:text-[16px]">0</p>
        </div>
        <hr className="vertical-line " />
        <div className="lg:flex  gap-2 text-center col-span-3">
          <span className=" text-neutral-400">Accuracy: </span>
          <p className="font-semibold text-3xl lg:text-[16px]">100%</p>
        </div>
        <hr className="vertical-line" />
        <div className="lg:flex  gap-2 text-center col-span-3">
          <span className=" text-neutral-400">Time: </span>
          <p className="font-semibold text-3xl lg:text-[16px]">0:60</p>
        </div>
      </div>

      {/* desktop design */}
      <div className="lg:flex items-center text-neutral-0 hidden">
        <div className="flex items-center gap-2">
          <p className=" text-neutral-400">Difficulty: </p>
          <button
            className={`btn-header ${btnClass("Easy")}`}
            onClick={() => setDifficulty("Easy")}
          >
            Easy
          </button>
          <button
            className={`btn-header ${btnClass("Medium")}`}
            onClick={() => setDifficulty("Medium")}
          >
            Medium
          </button>
          <button
            className={`btn-header ${btnClass("Hard")}`}
            onClick={() => setDifficulty("Hard")}
          >
            Hard
          </button>
        </div>
        <hr className="vertical-line" />
        <div className="flex items-center gap-2">
          <p className="text-neutral-400">Mode:</p>
          <button
            className={`btn-header ${btnClass("Time(60s)")}`}
            onClick={() => setMode("Time(60s)")}
          >
            Time(60s)
          </button>
          <button
            className={`btn-header ${btnClass("Passage")}`}
            onClick={() => setMode("Passage")}
          >
            Passage
          </button>
        </div>
      </div>

      {/* mobile design*/}
      <div className="grid grid-cols-2 my-5 w-[100%] gap-5 lg:hidden">
        <div className="relative">
          <div
            className="flex gap-2 cursor-pointer justify-center items-center text-lg text-neutral-0 border border-neutral-0 px-4 py-2 rounded-lg"
            onClick={() => setDiffIsOpen(!diffIsOpen)}
          >
            <p>{difficulty}</p>
            <img src={assets.iconDownArrow} alt="" width={10} />
          </div>

          {diffIsOpen && (
            <div
              className="absolute mt-2 z-50 w-full rounded-lg bg-neutral-700 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {["Easy", "Medium", "Hard"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-2 cursor-pointer text-lg text-neutral-0 hover:bg-neutral-600 rounded"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={item}
                    checked={difficulty === item}
                    onChange={() => {
                      setDifficulty(item);
                      setDiffIsOpen(false);
                    }}
                    className="hidden"
                  />
                  <span className="w-4 h-4 border border-white rounded-full flex items-center justify-center">
                    {difficulty === item && (
                      <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    )}
                  </span>
                  {item}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="flex gap-2 cursor-pointer justify-center items-center text-lg text-neutral-0 border border-neutral-0 px-4 py-2 rounded-lg"
            onClick={() => setModeIsOpen(!modeIsOpen)}
          >
            <p>{mode}</p>
            <img src={assets.iconDownArrow} alt="" width={10} />
          </div>

          {modeIsOpen && (
            <div
              className="absolute mt-2 z-50 w-full rounded-lg bg-neutral-700 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {["Time(60s)", "Passage"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-2 cursor-pointer text-lg text-neutral-0 hover:bg-neutral-600 rounded"
                >
                  <input
                    type="radio"
                    name="mode"
                    value={item}
                    checked={mode === item}
                    onChange={() => {
                      setMode(item);
                      setModeIsOpen(false);
                    }}
                    className="hidden"
                  />
                  <span className="w-4 h-4 border border-white rounded-full flex items-center justify-center">
                    {mode === item && (
                      <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    )}
                  </span>
                  {item}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDownHeader;
