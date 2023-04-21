import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/Main';
import Post from './pages/Post';
import Navbar from './pages/Navbar';
import Search from './pages/Search';
import GetAllMovies from './pages/GetAllMovies';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/getAll" element={<GetAllMovies/>}/>
    </Routes>
    <ToastContainer/>
  </BrowserRouter>
  );
}

export default App;
