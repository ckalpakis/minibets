// LoadingSpinner — Reusable loading indicator with animated pulse effect

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 0",
  gap: "16px",
};

const dotContainerStyle = {
  display: "flex",
  gap: "8px",
};

const textStyle = {
  color: "#888",
  fontSize: "14px",
};

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={containerStyle}>
      <div style={dotContainerStyle}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#e2b714",
              opacity: 0.4,
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p style={textStyle}>{message}</p>
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
