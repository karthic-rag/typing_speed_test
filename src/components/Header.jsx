import assets from "../assets/assets";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        {/* Desktop logo */}
        <img
          src={assets.logoLarge}
          alt="logo"
          className="hidden md:block w-50"
        />

        {/* mobile logo */}
        <img src={assets.logoSmall} alt="logo" className="md:hidden w-10" />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <img src={assets.iconPersonalBest} alt="personal best" />
          <p className="text-sm text-neutral-0 inline">
            <span className=" hidden md:inline text-neutral-400">
              Personal best:{" "}
            </span>
            <span className=" md:hidden text-neutral-400">Best: </span>
            92 WPM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
