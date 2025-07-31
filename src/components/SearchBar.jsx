import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <input
            type="text"
            placeholder="Suche nach Name oder Kategorie..."
            value={query}
            onChange={handleChange}
            className="w-full p-2 rounded border border-[var(--ctp-surface2)] bg-[var(--ctp-surface0)] text-[var(--ctp-text)] placeholder-[var(--ctp-subtext0)]"
        />
    );
};

export default SearchBar;