import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Header from "./Header";

const Layout = ({ children }) => {
  const { personalBest } = useAppContext();
  const best = localStorage.getItem("personalBest");
  return (
    <div className="min-h-screen min-width-screen relative bg-neutral-900 font-sora  ">
      <main className="md:w-[95%] m-auto p-5">
        <Header />

        {children}
      </main>
      {best < personalBest && best != 0 && (
        <img
          src={assets.confetti}
          alt=""
          className="absolute bottom-0 lg:right-10"
        />
      )}
    </div>
  );
};

export default Layout;
