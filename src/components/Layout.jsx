import DropDownHeader from "./DropDownHeader";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="h-screen width-screen bg-neutral-900 font-sora p-5 ">
      <main className="md:w-[95%] m-auto ">
        <Header />
        <DropDownHeader />
        {children}
      </main>
    </div>
  );
};

export default Layout;
