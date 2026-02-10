import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>hello</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
