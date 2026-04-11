export default function Chip({ label, color = "#00C896", bg, onClick }: { label: string; color?: string; bg?: string; onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      style={{
        background: bg || color + "18",
        color: color,
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}
