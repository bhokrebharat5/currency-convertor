import { useMemo, useState } from 'react';
import useCurrency from '../../hooks/useCurrency';
import InputBox from '../formElements/InputBox';

const Home = () => {
    const [amount, setAmount] = useState<number>(0);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("usd");
    const [toCurrency, setToCurrency] = useState<string>("inr");

    const { rates, isLoading, error } = useCurrency(fromCurrency);

    const currencyOptions = useMemo(
        () => (rates ? Object.keys(rates) : []),
        [rates],
    );

    const handleConvert = () => {
        if (!rates) return;
        const rate = rates[toCurrency];
        if (rate === undefined) {
            alert(`Conversion rate from ${fromCurrency} to ${toCurrency} not available.`);
            return;
        }
        setConvertedAmount(Math.round(amount * rate * 100) / 100);
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    return (
        <div className="flex flex-col mt-10 items-center h-150">
            <h1 className="text-4xl font-bold mb-2">Welcome to Currency Converter</h1>
            <p className="text-lg text-gray-600 mb-8">Convert your currency with ease and accuracy.</p>

            <div
                className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                }}
            >
                <div className="w-full">
                    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                        {error && (
                            <p className="mb-3 text-sm text-red-700 bg-red-100 rounded px-3 py-2">
                                Failed to load rates: {error.message}
                            </p>
                        )}
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleConvert();
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    onAmountChange={setAmount}
                                    currencyOptions={currencyOptions}
                                    selectedCurrency={fromCurrency}
                                    onCurrencyChange={setFromCurrency}
                                    currencyDisabled={isLoading || currencyOptions.length === 0}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    aria-label="Swap currencies"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                    onClick={handleSwap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    onAmountChange={setConvertedAmount}
                                    amountDisabled
                                    currencyOptions={currencyOptions}
                                    selectedCurrency={toCurrency}
                                    onCurrencyChange={setToCurrency}
                                    currencyDisabled={isLoading || currencyOptions.length === 0}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || !rates}
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? "Loading rates..."
                                    : `Convert ${fromCurrency.toUpperCase()} to ${toCurrency.toUpperCase()}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
