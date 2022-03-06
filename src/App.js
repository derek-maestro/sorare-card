import { Route, Routes } from "react-router-dom";
import "./App.css";
import CardsPage from "./pages/Cards";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<CardsPage />} path={`/cards/:slugs`} />
        <Route element={<ComingSoon />} path={`/players/:slug`} />
        <Route element={<ComingSoon />} path={`/clubs/:slug`} />
      </Routes>
    </div>
  );
}

export default App;
