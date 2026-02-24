"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Luft-Wasser", cop: 3.75, kosten: 1500 },
  { name: "Sole-Wasser", cop: 4.5, kosten: 1200 },
  { name: "Wasser-Wasser", cop: 5.5, kosten: 1000 },
];

export function COPComparisonChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#374151" }}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <YAxis
            yAxisId="cop"
            orientation="left"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            domain={[0, 7]}
            label={{
              value: "COP",
              angle: -90,
              position: "insideLeft",
              offset: -5,
              style: { fontSize: 12, fill: "#6b7280" },
            }}
          />
          <YAxis
            yAxisId="kosten"
            orientation="right"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickFormatter={(v) => `${Number(v).toLocaleString("de-DE")} €`}
            label={{
              value: "€/Jahr",
              angle: 90,
              position: "insideRight",
              offset: -5,
              style: { fontSize: 12, fill: "#6b7280" },
            }}
          />
          <Tooltip
            formatter={(value, name) => {
              const v = Number(value);
              if (name === "cop")
                return [v.toFixed(1), "COP (Leistungszahl)"];
              return [`${v.toLocaleString("de-DE")} €/Jahr`, "Heizkosten"];
            }}
            contentStyle={{
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
              fontSize: "0.875rem",
            }}
          />
          <Legend
            formatter={(value: string) =>
              value === "cop" ? "COP (Leistungszahl)" : "Jährliche Heizkosten"
            }
            wrapperStyle={{ fontSize: "0.875rem" }}
          />
          <Bar
            yAxisId="cop"
            dataKey="cop"
            fill="var(--primary)"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
          <Bar
            yAxisId="kosten"
            dataKey="kosten"
            fill="var(--secondary)"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
            animationBegin={300}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Durchschnittliche COP-Werte und Heizkosten bei 20.000 kWh/Jahr
        Heizwärmebedarf
      </p>
    </div>
  );
}
