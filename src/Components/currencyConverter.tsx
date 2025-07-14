import { useEffect, useState } from "react";
import { Select, InputNumber, Button } from "antd";
const { Option } = Select;

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [converted, setConverted] = useState<number | null>(null);

  const fetchRates = async () => {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    console.log(data);
    setRates(data.rates);
  };

  useEffect(() => {
    fetchRates();
  }, []); 

  const handleConvert = () => {
    if (!rates[from] || !rates[to]) return;
    const usdAmount = amount / rates[from];
    const convertedAmount = usdAmount * rates[to];
    setConverted(parseFloat(convertedAmount.toFixed(2)));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-700 to-purple-700 flex items-center justify-center p-6 rounded-xl">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">💱 Currency Converter</h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Amount</label>
          <InputNumber
            className="w-full"
            value={amount}
            onChange={(val) => setAmount(Number(val))}
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-1/2">
            <label className="block font-medium text-gray-700 mb-1">From</label>
            <Select value={from} onChange={setFrom} className="w-full">
              <Option value="USD">🇺🇸 USD</Option>
              <Option value="INR">🇮🇳 INR</Option>
              <Option value="AED">🇦🇪 AED</Option>
            </Select>
          </div>

          <span className="text-2xl text-gray-600 mt-6">⇌</span>

          <div className="w-1/2">
            <label className="block font-medium text-gray-700 mb-1">To</label>
            <Select value={to} onChange={setTo} className="w-full">
              <Option value="INR">🇮🇳 INR</Option>
              <Option value="USD">🇺🇸 USD</Option>
              <Option value="AED">🇦🇪 AED</Option>
            </Select>
          </div>
        </div>

        <Button
          type="primary"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={handleConvert}
        >
          Convert
        </Button>

        {converted !== null && (
          <div className="mt-6 text-center text-lg font-semibold text-green-600 bg-green-50 border border-green-300 rounded p-3">
            {amount.toLocaleString()} {from} = {converted.toLocaleString()} {to}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
