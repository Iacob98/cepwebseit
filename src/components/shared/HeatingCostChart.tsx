"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { name: "Wärmepumpe", kosten: 1500, color: "var(--primary)" },
  { name: "Gasheizung", kosten: 2800, color: "#6b7280" },
  { name: "Elektroheizung", kosten: 6000, color: "#b91c1c" },
];

export function HeatingCostChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#374151" }}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickFormatter={(v) => `${Number(v).toLocaleString("de-DE")} €`}
          />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString("de-DE")} €/Jahr`,
              "Heizkosten",
            ]}
            contentStyle={{
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
              fontSize: "0.875rem",
            }}
          />
          <Bar dataKey="kosten" radius={[6, 6, 0, 0]} animationDuration={1200}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
            <LabelList
              dataKey="kosten"
              position="top"
              formatter={(v: unknown) => `${Number(v).toLocaleString("de-DE")} €`}
              style={{ fontSize: 13, fontWeight: 600, fill: "#374151" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Typisches Einfamilienhaus 150 m², 20.000 kWh/Jahr Heizwärmebedarf
      </p>
    </div>
  );
}
