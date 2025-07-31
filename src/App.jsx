import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import Home from "./pages/Home.jsx";
import Cookbook from "./pages/Cookbook.jsx";




export default function App() {
    return (
        <>
            <NavBar />
            <div className="max-w-5xl mx-auto p-6">
                <Routes>
                    <Route path="/home/" element={<Home />} />
                    <Route path="/kochbuch/" element={<Cookbook />} />
                </Routes>
            </div>
        </>
    );
}