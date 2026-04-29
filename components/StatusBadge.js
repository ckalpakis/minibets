// StatusBadge — Colored pill badge indicating bet status (Open, Joined, Resolved)

const statusColors = {
  Open: { bg: "rgba(46, 204, 113, 0.15)", color: "#2ecc71", border: "rgba(46, 204, 113, 0.3)" },
  Joined: { bg: "rgba(52, 152, 219, 0.15)", color: "#3498db", border: "rgba(52, 152, 219, 0.3)" },
  Resolved: { bg: "rgba(155, 89, 182, 0.15)", color: "#9b59b6", border: "rgba(155, 89, 182, 0.3)" },
};

export default function StatusBadge({ status }) {
  const sc = statusColors[status] || statusColors.Open;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
        background: sc.bg,
        color: sc.color,
        border: `1px solid ${sc.border}`,
      }}
    >
      {status}
    </span>
  );
}
