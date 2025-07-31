import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import Home from "./pages/Home.jsx";




export default function App() {
    return (
        <>
            <NavBar />
            <Home />
            <div className="max-w-5xl mx-auto p-6">
                <Routes>
                    <Route path="/home/" element={<Home />} />
                </Routes>
            </div>
        </>
    );
}