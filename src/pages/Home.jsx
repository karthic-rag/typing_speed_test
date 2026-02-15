import React, { useEffect } from "react";
import TextBody from "../components/TextBody";
import DropDownHeader from "../components/DropDownHeader";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { restartTest, isActive } = useAppContext();
  useEffect(() => {
    const handleAltPress = (e) => {
      if (e.altKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        restartTest();
      }
    };

    window.addEventListener("keydown", handleAltPress);

    return () => window.removeEventListener("keydown", handleAltPress);
  }, [restartTest]);

  return (
    <div className="min-h-[80vh]">
      <DropDownHeader />
      <TextBody />
      <hr className="text-neutral-400 my-3" />
      <div className="text-center">
        <abbr title="Press alt + c">
          <button
            onClick={restartTest}
            disabled={!isActive}
            className="px-4 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-800 text-xl text-neutral-0"
          >
            Restart test
            <img
              className="inline ml-2"
              src={assets.iconRestart}
              alt="restart"
              width={20}
            />
          </button>
        </abbr>
      </div>
    </div>
  );
};

export default Home;
