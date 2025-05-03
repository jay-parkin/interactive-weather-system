import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ForecastGraph({ forecast }) {
  const data = forecast.map((day) => ({
    name: day.date,
    Min: day.tempMin,
    Max: day.tempMax,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="°C" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Min" stroke="#8884d8" />
          <Line type="monotone" dataKey="Max" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
