import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Room from './components/Room';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
