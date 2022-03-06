import { Route, Routes } from 'react-router-dom';
import "./App.css";
import CardsPage from './pages/Cards';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<CardsPage />} path={`/cards/:slug`} />
      </Routes>
    </div>
  );
}

export default App;
