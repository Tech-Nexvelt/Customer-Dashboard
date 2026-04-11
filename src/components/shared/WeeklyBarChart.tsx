"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { weeklyData } from "@/data/mockJobs";

export default function WeeklyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart data={weeklyData} barSize={28}>
        <XAxis
          dataKey="week"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            borderRadius: 10,
            border: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            fontSize: 13,
          }}
          cursor={{ fill: "#00C89610" }}
        />
        <Bar dataKey="applied" fill="#00C896" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
