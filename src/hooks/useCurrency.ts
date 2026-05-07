import { useEffect, useState } from "react";

export type CurrencyRates = Record<string, number>;

export type UseCurrencyResult = {
    rates: CurrencyRates | null;
    isLoading: boolean;
    error: Error | null;
};

const useCurrency = (currency: string): UseCurrencyResult => {
    const [previousCurrency, setPreviousCurrency] = useState<string>(currency);
    const [rates, setRates] = useState<CurrencyRates | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    if (currency !== previousCurrency) {
        setPreviousCurrency(currency);
        setRates(null);
        setIsLoading(true);
        setError(null);
    }

    useEffect(() => {
        const controller = new AbortController();

        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
            { signal: controller.signal },
        )
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                return res.json() as Promise<Record<string, CurrencyRates>>;
            })
            .then((json) => {
                setRates(json[currency] ?? null);
                setIsLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError(err instanceof Error ? err : new Error(String(err)));
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [currency]);

    return { rates, isLoading, error };
};

export default useCurrency;
