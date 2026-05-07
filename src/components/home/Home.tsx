import {useState } from 'react';
import useCurrency from '../../hooks/useCurrency';

import InputBox from '../formElements/InputBox';

const Home: React.FC = () => {
    const [ amount, setAmount ] = useState<number>(0);
    const [ convertedAmount, setConvertedAmount ] = useState<number>(0);
    const [ fromCurrency, setFromCurrency ] = useState<string>("usd");
    const [ toCurrency, setToCurrency ] = useState<string>("inr");

    const currencyInfo = useCurrency(fromCurrency);

    const currencyOptions = currencyInfo && Object.keys(currencyInfo);


    const handleConvert = () => {
        if (!currencyInfo) return;

        const rate = currencyInfo[toCurrency];
        if (!rate) {
            alert(`Conversion rate from ${fromCurrency} to ${toCurrency} not available.`);
            return;
        }

        const converted = Math.round(amount * rate * 100) / 100;
        setConvertedAmount(converted);
    }

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    }


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
                        <form className="flex flex-col gap-4" onSubmit={ (e)=> {
                            e.preventDefault();
                            handleConvert();
                        }}>
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    onAmountChange={ (amount) => setAmount(amount) }
                                    currencyOptions={currencyOptions || []}
                                    selectedCurrency={fromCurrency}
                                    onCurrencyChange={ (currency) => setFromCurrency(currency) }    
                                    currencyDisabled={currencyOptions ? false : true}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
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
                                    onAmountChange={ (amount) => setConvertedAmount(amount) }
                                    currencyOptions={currencyOptions || []}
                                    selectedCurrency={toCurrency}
                                    onCurrencyChange={ (currency) => setToCurrency(currency) }    
                                    currencyDisabled={currencyOptions ? false : true}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                                Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}   

export default Home;