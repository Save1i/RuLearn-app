import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1>Главная страница</h1>;
}

function Lessons() {
  return <h1>Уроки русского языка</h1>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Главная</Link> | <Link to="/lessons">Уроки</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
      </Routes>
    </div>
  );
}

export default App;
