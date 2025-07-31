import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';

const Cookbook = () => {
    const [recipes, setRecipes] = useState([]);
    const [selected, setSelected] = useState(null);

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

    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('recipes');
        if (stored) {
            const parsed = JSON.parse(stored);
            setRecipes(parsed);
            setFiltered(parsed);
        }
    }, []);

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
        const updated = recipes.filter(r => r.id !== id);
        setRecipes(updated);
        setFiltered(updated);
        localStorage.setItem('recipes', JSON.stringify(updated));
        setSelected(null); // Detailbereich leeren
    };

    const handleEdit = (id) => {
        console.log("Rezept bearbeiten:", id);
        // später: navigate(`/edit/${id}`)
    };


    return (
        <div className="flex gap-4">
            {/* Linke Seite: Liste */}
            <div className="w-1/3 bg-[var(--ctp-surface0)] p-4 rounded-xl shadow">
                <h2 className="text-lg font-bold mb-2 text-[var(--ctp-mauve)]">Rezepte</h2>
                <SearchBar onSearch={handleSearch}/>
                <ul className="space-y-2">
                    {filtered.map((r) => (
                        <li
                            key={r.id}
                            onClick={() => setSelected(r)}
                            className="cursor-pointer p-2 rounded hover:bg-[var(--ctp-surface1)]"
                        >
                            {r.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Rechte Seite: Details */}
            <div className="w-2/3 bg-[var(--ctp-surface0)] p-4 rounded-xl shadow">
                {selected ? (
                    <div>
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
                        <div className="mt-6 flex gap-4">
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
                    </div>
                ) : (
                    <p className="text-[var(--ctp-subtext1)] italic">Wähle ein Rezept aus der Liste</p>
                )}
            </div>
        </div>
    );
};

export default Cookbook;