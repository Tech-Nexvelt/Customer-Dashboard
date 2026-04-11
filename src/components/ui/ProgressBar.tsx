export default function ProgressBar({ value = 0, color = "#00C896", height = 8 }) {
  return (
    <div
      style={{
        background: "#E5E7EB",
        borderRadius: 999,
        height,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.min(value, 100)}%`,
          height: "100%",
          borderRadius: 999,
          background: `linear-gradient(90deg, ${color}, ${color}CC)`,
          transition: "width 0.8s ease",
        }}
      />
    </div>
  );
}
