import { useEffect, useId, useMemo, useRef, useState } from "react";

type CurrencyComboboxProps = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

const CurrencyCombobox = ({
    options,
    value,
    onChange,
    disabled = false,
}: CurrencyComboboxProps) => {
    const listboxId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const activeOptionRef = useRef<HTMLLIElement>(null);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter((c) => c.toLowerCase().includes(q));
    }, [options, query]);

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
        activeOptionRef.current?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    const onQueryChange = (next: string) => {
        setQuery(next);
        setActiveIndex(0);
    };

    const commit = (next: string) => {
        onChange(next);
        setOpen(false);
        setQuery("");
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const next = filtered[activeIndex];
            if (next) commit(next);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            setQuery("");
        }
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <button
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listboxId}
                onClick={() => !disabled && setOpen((o) => !o)}
                className="w-full rounded-lg px-2 py-1 bg-gray-100 text-right cursor-pointer outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {value.toUpperCase()}
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        placeholder="Search..."
                        onChange={(e) => onQueryChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="w-full px-2 py-1.5 text-sm border-b border-gray-200 outline-none"
                    />
                    <ul
                        id={listboxId}
                        role="listbox"
                        className="max-h-48 overflow-y-auto text-left text-sm"
                    >
                        {filtered.length === 0 && (
                            <li className="px-2 py-1.5 text-gray-400">No matches</li>
                        )}
                        {filtered.map((currency, i) => {
                            const isActive = i === activeIndex;
                            const isSelected = currency === value;
                            return (
                                <li
                                    key={currency}
                                    ref={isActive ? activeOptionRef : null}
                                    role="option"
                                    aria-selected={isSelected}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        commit(currency);
                                    }}
                                    className={`px-2 py-1.5 cursor-pointer ${
                                        isActive ? "bg-blue-100" : ""
                                    } ${isSelected ? "font-semibold" : ""}`}
                                >
                                    {currency.toUpperCase()}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrencyCombobox;
