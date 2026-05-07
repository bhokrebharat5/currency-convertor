import { useId } from "react";

type InputBoxProps = {
    label: string;
    amount: number;
    onAmountChange: (value: number) => void;
    amountDisabled?: boolean;
    currencyOptions: string[];
    selectedCurrency?: string;
    onCurrencyChange?: (value: string) => void;
    currencyDisabled?: boolean;
    className?: string;
};

const InputBox = ({
    label,
    amount,
    onAmountChange,
    amountDisabled = false,
    currencyOptions,
    selectedCurrency = "usd",
    onCurrencyChange,
    currencyDisabled = false,
    className = "",
}: InputBoxProps) => {
    const amountInputId = useId();
    const currencySelectId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    className="outline-none w-full bg-transparent py-1.5"
                    placeholder="Enter amount"
                    value={Number.isFinite(amount) ? amount : 0}
                    onChange={(e) => {
                        const next = e.target.valueAsNumber;
                        onAmountChange(Number.isFinite(next) ? next : 0);
                    }}
                    disabled={amountDisabled}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <label htmlFor={currencySelectId} className="text-black/40 mb-2 w-full">
                    Currency Type
                </label>
                <select
                    id={currencySelectId}
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange?.(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default InputBox;
