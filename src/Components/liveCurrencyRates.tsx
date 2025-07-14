import { Table, Spin, Button } from "antd";
import { useGetLiveRatesQuery } from "../api/currencyApi";
import { ReloadOutlined } from "@ant-design/icons";

const LiveCurrencyRates = ({ onOpenConverter }: { onOpenConverter: () => void }) => {
  const { data, error, isLoading, refetch } = useGetLiveRatesQuery("USD");

  const columns = [
    {
      title: "🌍 Currency",
      dataIndex: "currency",
      key: "currency",
      render: (text: string) => (
        <span className="font-medium tracking-wide">
          {getFlagEmoji(text)} {text}   
        </span>
      ),
    },
    {
      title: "💱 Rate (1 USD =)",
      dataIndex: "rate",
      key: "rate",
      render: (rate: string) => (
        <span className="text-indigo-600 font-semibold">{rate}</span>
      ),
    },
  ];

  const dataSource =
    data?.rates && typeof data.rates === "object"
      ? Object.entries(data.rates).map(([currency, rate], index) => ({
          key: index,
          currency,
          rate: typeof rate === "number" ? rate.toFixed(2) : "N/A",
        }))
      : [];

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto text-center">
          🌐 Live Currency Rates (Base: USD)
        </h2>

        <div className="flex gap-3 items-center">
          <Button
            onClick={onOpenConverter}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200 border-none"
          >
            💱 <span className="ml-1 font-semibold tracking-wide">Convert Currency</span>
          </Button>

          <button
            onClick={() => refetch()}
            className="text-indigo-500 hover:text-indigo-700 transition"
            title="Refresh Rates"
          >
            <ReloadOutlined className="text-xl" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-600 font-semibold text-center">Error fetching rates.</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          <Table
            columns={columns}
            dataSource={dataSource.slice(0, 15)}
            pagination={false}
            size="small"
            rowClassName="hover:bg-indigo-50 transition"
          />
        </div>
      )}
    </div>
  );
};

// 🎌 Optional: Flag Emojis for Visual Feel
const getFlagEmoji = (currency: string) => {
  const flags: Record<string, string> = {
    USD: "🇺🇸", EUR: "🇪🇺", INR: "🇮🇳", GBP: "🇬🇧", JPY: "🇯🇵", CNY: "🇨🇳", AUD: "🇦🇺",
    CAD: "🇨🇦", CHF: "🇨🇭", BRL: "🇧🇷", ZAR: "🇿🇦", RUB: "🇷🇺", SGD: "🇸🇬",
    NZD: "🇳🇿", THB: "🇹🇭",
  };
  return flags[currency] || "💱";
};

export default LiveCurrencyRates;
