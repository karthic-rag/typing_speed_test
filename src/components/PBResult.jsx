import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const PBResult = () => {
  const { stats, beatThisScore, personalBest } = useAppContext();
  localStorage.setItem("personalBest", personalBest);

  return (
    <div className="flex flex-col p-2 justify-center items-center gap-3 mb-20 lg:mb-75  text-center text-neutral-0">
      <div className="rounded-full mb-5">
        <img src={assets.iconNewPb} alt="completed" />
      </div>

      <h2 className="md:text-5xl text-4xl font-semibold">
        High Score Smashed!
      </h2>
      <p className="md:text-sm text-[12px] text-neutral-400 mb-5">
        You're getting faster. That was incredible typing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:w-[55%] md:w-[80%] w-full gap-4 mb-5">
        <div className="border flex flex-col items-start lg:items-center border-neutral-500 rounded-lg p-4">
          <p className="text-2xl text-neutral-500">WPM:</p>
          <p className="text-2xl">{stats.wpm}</p>
        </div>
        <div className="border flex flex-col items-start lg:items-center border-neutral-500 rounded-lg p-4">
          <p className="text-2xl text-neutral-500">Accuracy:</p>
          <p className="text-2xl text-red-500">{stats.accuracy}%</p>
        </div>
        <div className="border flex flex-col items-start lg:items-center border-neutral-500 rounded-lg p-4">
          <p className="text-2xl text-neutral-500">Characters:</p>
          <p className="text-2xl text-green-500">
            {stats.correctChars}/
            <span className="text-red-500">{stats.mistakes}</span>
          </p>
        </div>
      </div>
      <div className="flex py-2 px-4 z-51 rounded-lg bg-neutral-0 text-neutral-900 text-xl">
        <button onClick={beatThisScore}>
          Go Again{" "}
          <img
            src={assets.iconRestart}
            alt="restart"
            width={20}
            className="inline invert"
          />
        </button>
      </div>
    </div>
  );
};

export default PBResult;
