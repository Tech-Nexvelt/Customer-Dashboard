import Card from "./Card";

export default function StatCard({ label, value, unit, trend, color, Icon }: { label: string; value: string | number; unit?: string; trend?: string; color: string; Icon: any }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p
            style={{
              color: "#6B7280",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 8,
            }}
          >
            {label}
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>
              {value}
            </span>
            {unit && (
              <span style={{ color: "#6B7280", fontSize: 14 }}>{unit}</span>
            )}
          </div>
          <p style={{ color, fontSize: 12, marginTop: 3, fontWeight: 500 }}>
            {trend}
          </p>
        </div>
        {Icon && (
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: color + "18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={19} color={color} />
          </div>
        )}
      </div>
    </Card>
  );
}
