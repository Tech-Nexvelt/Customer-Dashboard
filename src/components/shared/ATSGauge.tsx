export default function ATSGauge({ score = 87, size = 120 }) {
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}
      >
        {/* Background ring */}
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        {/* Progress ring */}
        <circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke="#00C896"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>
      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>{score}</div>
        <div style={{ fontSize: 11, color: "#6B7280" }}>/100</div>
      </div>
    </div>
  );
}
