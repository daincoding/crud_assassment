import {Routes, Route, useLocation, Navigate} from 'react-router-dom';

// Fehler disablen weil ich Motion als anonymes prop an JSX übergebe .. und ich mag keine Fehler unten sehen :3
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

import NavBar from './components/NavBar';
import './App.css';
import Home from "./pages/Home.jsx";
import Cookbook from "./pages/Cookbook.jsx";
import NewRecipe from "./pages/NewRecipe.jsx";

export default function App() {
    const location = useLocation();

    return (
        <>
            <NavBar />
            <div className="max-w-5xl mx-auto pt-2 px-6">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/home/" element={
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Home />
                            </motion.div>
                        } />
                        <Route path="/kochbuch/" element={
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Cookbook />
                            </motion.div>
                        } />
                        <Route path="/neu" element={
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NewRecipe />
                            </motion.div>
                        } />
                        <Route path="/edit/:id" element={
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NewRecipe />
                            </motion.div>
                        } />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                </AnimatePresence>
            </div>
        </>
    );
}