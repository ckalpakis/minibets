// EmptyState — Placeholder UI shown when there are no items to display

const containerStyle = {
  textAlign: "center",
  padding: "48px 24px",
  color: "#666",
};

const iconStyle = {
  fontSize: "36px",
  marginBottom: "12px",
  opacity: 0.5,
};

const textStyle = {
  fontSize: "16px",
  lineHeight: "1.5",
};

export default function EmptyState({ message = "Nothing here yet." }) {
  return (
    <div style={containerStyle}>
      <div style={iconStyle}>---</div>
      <p style={textStyle}>{message}</p>
    </div>
  );
}
