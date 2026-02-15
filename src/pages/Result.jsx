import { useNavigate } from "react-router-dom";
import CommonResult from "../components/CommonResult";
import FirstResult from "../components/FirstResult";
import PBResult from "../components/PBResult";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Result = () => {
  const { personalBest, stats } = useAppContext();
  const best = localStorage.getItem("personalBest");

  const navigate = useNavigate();

  useEffect(() => {
    if (stats.correctChars === 0) {
      navigate("/");
    }
  }, [stats, navigate]);

  return (
    <div>
      {best == 0 && <FirstResult />}
      {best < personalBest && best != 0 && <PBResult />}
      {best == personalBest && <CommonResult />}
    </div>
  );
};

export default Result;
