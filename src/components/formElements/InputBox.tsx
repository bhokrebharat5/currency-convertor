import { useId } from "react";
import CurrencyCombobox from "./CurrencyCombobox";

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
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <CurrencyCombobox
                    options={currencyOptions}
                    value={selectedCurrency}
                    onChange={(v) => onCurrencyChange?.(v)}
                    disabled={currencyDisabled}
                />
            </div>
        </div>
    );
};

export default InputBox;
