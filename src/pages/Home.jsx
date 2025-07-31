import { useEffect, useState } from "react";

// Fehler disablen weil ich Motion als anonymes prop an JSX übergebe .. und ich mag keine Fehler unten sehen :3
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("recipes"));

        if (stored && stored.length > 0) {
            setRecipes(stored);
        } else {
            fetch("/data/recipes.json")
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("recipes", JSON.stringify(data));
                    setRecipes(data);
                });
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % recipes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [recipes]);

    const getVisibleRecipes = () => {
        if (recipes.length < 3) return recipes;
        const result = [];
        for (let i = -1; i <= 1; i++) {
            result.push(recipes[(index + i + recipes.length) % recipes.length]);
        }
        return result;
    };

    const visible = getVisibleRecipes();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--ctp-base)] px-6 pt-0.5 pb-6 gap-6 text-center">

            {/* Karussell oben */}
            <div className="relative w-full max-w-2xl h-[250px] overflow-hidden">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={index}
                        className="absolute top-0 left-0 w-full"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            {visible.map((r, i) => (
                                <div
                                    key={r.id}
                                    className={`flex items-center gap-4 bg-[var(--ctp-surface0)] p-4 rounded-xl shadow-md w-full transition-all duration-300
                    ${i === 1 ? "scale-100 opacity-100" : "scale-90 opacity-40"}
                  `}
                                >
                                    {r.image && (
                                        <img
                                            src={r.image}
                                            alt={r.title}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    )}
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-[var(--ctp-text)]">{r.title}</h3>
                                        <p className="text-xs text-[var(--ctp-subtext0)]">{r.category}</p>
                                        <p className="text-xs text-[var(--ctp-subtext1)] line-clamp-2">{r.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Titel */}
            <h1 className="text-3xl font-bold text-[var(--ctp-peach)] mt-4">🧑🏼‍🍳 Secret Cookbook</h1>

            {/* Reset Button */}
            <button
                onClick={() => {
                    if (!window.confirm("Reset wirklich durchführen?")) return;
                    localStorage.clear();
                    fetch("/data/recipes.json")
                        .then((res) => res.json())
                        .then((data) => {
                            localStorage.setItem("recipes", JSON.stringify(data));
                            window.location.reload();
                        });
                }}
                className="px-3 py-1 text-sm rounded bg-[var(--ctp-surface2)] text-[var(--ctp-text)] hover:bg-[var(--ctp-red)]"
            >
                Reset
            </button>
        </div>
    );
};

export default Home;