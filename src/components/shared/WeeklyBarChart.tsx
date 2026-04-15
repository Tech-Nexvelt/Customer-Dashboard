"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyBarChart({ data = [] }: { data?: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart data={data} barGap={4} barSize={12}>
        <XAxis
          dataKey="week"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "none",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            fontSize: 12,
            fontWeight: 600,
            color: "#1E293B"
          }}
          cursor={{ fill: "#F1F5F9" }}
        />
        <Bar dataKey="found" fill="#64748B80" radius={[4, 4, 0, 0]} name="Found" />
        <Bar dataKey="applied" fill="#2DD4BF" radius={[4, 4, 0, 0]} name="Applied" />
      </BarChart>
    </ResponsiveContainer>
  );
}
