import { useEffect, useState } from "react";

const RecipeComments = ({ recipeId }) => {
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ name: "", text: "", rating: 5 });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("comments")) || {};
        setComments(stored[recipeId] || []);
    }, [recipeId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            name: form.name,
            text: form.text,
            rating: Number(form.rating),
            date: new Date().toLocaleDateString()
        };

        const stored = JSON.parse(localStorage.getItem("comments")) || {};
        const updated = { ...stored, [recipeId]: [...(stored[recipeId] || []), newComment] };
        localStorage.setItem("comments", JSON.stringify(updated));
        setComments(updated[recipeId]);
        setForm({ name: "", text: "", rating: 5 });
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-[var(--ctp-lavender)] mb-2">Bewertungen</h3>
            {comments.length === 0 ? (
                <p className="text-sm text-[var(--ctp-subtext1)] italic">Noch keine Bewertungen.</p>
            ) : (
                <ul className="space-y-2 mb-4">
                    {comments.map((c, i) => (
                        <li key={i} className="border border-[var(--ctp-surface2)] p-3 rounded bg-[var(--ctp-surface1)]">
                            <div className="flex justify-between text-sm font-semibold">
                                <span>{c.name}</span>
                                <span>{"⭐".repeat(c.rating)}</span>
                            </div>
                            <p className="text-[var(--ctp-subtext0)] mt-1">{c.text}</p>
                            <p className="text-xs text-[var(--ctp-subtext1)]">{c.date}</p>
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Dein Name" required className="w-full p-2 rounded bg-[var(--ctp-surface0)] text-[var(--ctp-text)]" />
                <textarea name="text" value={form.text} onChange={handleChange} placeholder="Kommentar" required className="w-full p-2 rounded bg-[var(--ctp-surface0)] text-[var(--ctp-text)]" />
                <select name="rating" value={form.rating} onChange={handleChange} className="w-full p-2 rounded bg-[var(--ctp-surface0)] text-[var(--ctp-text)]">
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r} Stern{r > 1 ? "e" : ""}</option>
                    ))}
                </select>
                <button type="submit" className="bg-[var(--ctp-green)] text-[var(--ctp-base)] px-4 py-2 rounded font-bold">
                    Absenden
                </button>
            </form>
        </div>
    );
};

export default RecipeComments;