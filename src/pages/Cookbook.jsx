import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import {useNavigate} from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import RecipeComments from "../components/RecipeComments.jsx";

const Cookbook = () => {

   //region ⛮ USESTATES
    const [recipes, setRecipes] = useState([]);
    const [selected, setSelected] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();


    // ⚙️ Loading von den verschiedenen Daten...

    useEffect(() => {
        const stored = localStorage.getItem('recipes');
        if (stored) {
            setRecipes(JSON.parse(stored));
        } else {
            // Fetch aus Datei
            fetch('./data/recipes.json')
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('recipes', JSON.stringify(data));
                    setRecipes(data);
                });
        }
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('recipes');
        if (stored) {
            const parsed = JSON.parse(stored);
            setRecipes(parsed);
            setFiltered(parsed);
        }
    }, []);
    //endregion

    // region 🧮 FUNCTION HANDLERS
    const handleSearch = (query) => {
        const lower = query.toLowerCase();
        const filteredResults = recipes.filter(
            (r) =>
                r.title.toLowerCase().includes(lower) ||
                r.category.toLowerCase().includes(lower)
        );
        setFiltered(filteredResults);
    };

    const handleDelete = (id) => {

        // Sicherheitsabfrage nach dem Button Push...

        const confirmDelete = window.confirm("Bist du dir sicher, dass du dieses Rezept löschen möchtest?");
        if (!confirmDelete) return;

        const updated = recipes.filter(r => r.id !== id);
        setRecipes(updated);
        setFiltered(updated);
        localStorage.setItem('recipes', JSON.stringify(updated));
        setSelected(null); // Detailbereich leeren
    };


    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleCategoryFilter = (category) => {
        const result = recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
        setFiltered(result);
    };
    //endregion

    //region BONUS 💥

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(favs);
    }, []);

    const toggleFavorite = (e, id) => {
        e.stopPropagation(); // verhindert Klick auf Rezeptauswahl
        let updated;
        if (favorites.includes(id)) {
            updated = favorites.filter(f => f !== id);
        } else {
            updated = [...favorites, id];
        }
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    const handleFavoriteFilter = () => {
        const favRecipes = recipes.filter(r => favorites.includes(r.id));
        setFiltered(favRecipes);
    };

    //endregion

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Linke Seite: Liste */}
            <div className="w-full md:w-1/3 bg-[var(--ctp-surface0)] p-4 rounded-xl shadow flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2 text-[var(--ctp-mauve)]">Rezepte</h2>
                <SearchBar onSearch={handleSearch}/>
                <div className="flex flex-wrap justify-center gap-2 mt-4 mb-4">
                    {["Hauptgericht", "Dessert", "Frühstück", "Vorspeise", "Suppe"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className="px-2 py-0.5 text-xs rounded-full bg-[var(--ctp-surface2)] text-[var(--ctp-subtext1)] hover:bg-[var(--ctp-peach)]"
                        >
                            {cat}
                        </button>
                    ))}
                    <button
                        onClick={() => setFiltered(recipes)}
                        className="px-2 py-0.5 text-xs rounded-full bg-[var(--ctp-surface1)] text-[var(--ctp-subtext0)] hover:bg-[var(--ctp-lavender)]"
                    >
                        Alle
                    </button>
                    <button
                        onClick={handleFavoriteFilter}
                        className="px-2 py-0.5 text-xs rounded-full bg-[var(--ctp-surface2)] text-[var(--ctp-subtext1)] hover:bg-[var(--ctp-yellow)]"
                    >
                        Nur Favoriten
                    </button>
                </div>
                <ul className="space-y-2 w-full">
                    {filtered.map((r) => (
                        <li
                            key={r.id}
                            onClick={() => setSelected(r)}
                            className="cursor-pointer px-4 py-3 rounded border border-[var(--ctp-surface2)] bg-[var(--ctp-surface0)] hover:bg-[var(--ctp-surface1)] relative flex justify-between items-start"
                        >
                            <div>
                                <span className="block text-[var(--ctp-text)] font-semibold">{r.title}</span>
                                <span className="text-xs text-[var(--ctp-subtext0)] bg-[var(--ctp-crust)] px-2 py-0.5 rounded-full">
                            {r.category}
                             </span>
                            </div>
                            <button
                                onClick={(e) => toggleFavorite(e, r.id)}
                                className="text-yellow-400 text-lg"
                                title="Als Favorit markieren"
                            >
                                {favorites.includes(r.id) ? <FaStar /> : <FaRegStar />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Rechte Seite: Details */}
            <div className="w-full md:w-2/3 bg-[var(--ctp-surface0)] p-4 rounded-xl shadow flex flex-col justify-between min-h-[400px]">
                {selected ? (
                    <div>
                        {selected.image && (
                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-bold text-[var(--ctp-peach)]">{selected.title}</h2>
                        <p className="text-sm text-[var(--ctp-subtext0)]">{selected.category}</p>
                        <h3 className="mt-4 font-semibold text-[var(--ctp-yellow)]">Zutaten:</h3>
                        <ul className="list-disc list-inside">
                            {selected.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                        <h3 className="mt-4 font-semibold text-[var(--ctp-yellow)]">Beschreibung:</h3>
                        <p>{selected.description}</p>
                        <h3 className="mt-4 font-semibold text-[var(--ctp-yellow)]">Zubereitung:</h3>
                        <p>{selected.preparation}</p>
                        <div className="mt-auto flex justify-end gap-4 pt-6">
                            <button
                                onClick={() => handleDelete(selected.id)}
                                className="bg-[var(--ctp-red)] text-[var(--ctp-base)] px-4 py-2 rounded font-semibold"
                            >
                                Löschen
                            </button>
                            <button
                                onClick={() => handleEdit(selected.id)}
                                className="bg-[var(--ctp-yellow)] text-[var(--ctp-base)] px-4 py-2 rounded font-semibold"
                            >
                                Bearbeiten
                            </button>
                        </div>
                        <RecipeComments recipeId={selected.id} />
                    </div>
                ) : (
                    <p className="text-[var(--ctp-subtext1)] italic">Wähle ein Rezept aus der Liste</p>
                )}
            </div>
        </div>
    );
};

export default Cookbook;