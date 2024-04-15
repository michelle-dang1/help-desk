import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackendAdmin from './BackendAdmin';
import BackendAdminResponse from './BackendAdminResponse';
import MainPage from './MainPage';
import Nav from './Nav';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="admin/" element={<BackendAdmin />} />
          <Route path="admin/:id/" element={<BackendAdminResponse />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
