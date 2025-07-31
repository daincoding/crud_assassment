import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewRecipe = () => {

    // region 🛠️ USESTATES
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        title: "",
        category: "",
        ingredients: "",
        description: "",
        preparation: "",
        image: ""
    });

    useEffect(() => {
        if (id) {
            const stored = JSON.parse(localStorage.getItem("recipes")) || [];
            const existing = stored.find((r) => r.id === Number(id));
            if (existing) {
                setForm({
                    ...existing,
                    ingredients: existing.ingredients.join(", "),
                    image: existing.image || ""
                });
            }
        }
    }, [id]);
    //endregion


    // region 🧮 HANDLERS
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = {
            id: id ? Number(id) : Date.now(),
            title: form.title,
            category: form.category,
            ingredients: form.ingredients.split(",").map(i => i.trim()),
            description: form.description,
            preparation: form.preparation,
            image: form.image || ""
        };

        const stored = JSON.parse(localStorage.getItem("recipes")) || [];
        let updated;

        if (id) {
            // Edit-Modus
            updated = stored.map((r) => (r.id === Number(id) ? newRecipe : r));
        } else {
            // Create-Modus
            updated = [...stored, newRecipe]; // ...stored setzt die Daten nach hinten der "JSON"
        }

        localStorage.setItem("recipes", JSON.stringify(updated));
        navigate("/kochbuch");
    };
    //endregion

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-[var(--ctp-surface0)] p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-[var(--ctp-lavender)]">
                {id ? "Rezept bearbeiten" : "Neues Rezept anlegen"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Titel" required className="w-full p-2 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-text)]" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Kategorie" required className="w-full p-2 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-text)]" />
                <textarea name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Zutaten (kommagetrennt)" required className="w-full p-2 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-text)]" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Kurzbeschreibung" required className="w-full p-2 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-text)]" />
                <textarea name="preparation" value={form.preparation} onChange={handleChange} placeholder="Zubereitung" required className="w-full p-2 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-text)]" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setForm((prev) => ({ ...prev, image: reader.result }));
                        };
                        reader.readAsDataURL(file);
                    }}
                    className="w-full p-2 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-text)]"
                />
                <button type="submit" className="bg-[var(--ctp-green)] text-[var(--ctp-base)] px-4 py-2 rounded font-bold">
                    {id ? "Änderungen speichern" : "Speichern"}
                </button>
            </form>
        </div>
    );
};

export default NewRecipe;