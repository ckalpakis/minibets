// PageHeading — Consistent page title component with optional subtitle

const headingStyle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "6px",
  color: "#fff",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#888",
  marginBottom: "24px",
};

export default function PageHeading({ title, subtitle }) {
  return (
    <div>
      <h1 style={headingStyle}>{title}</h1>
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
    </div>
  );
}
