export default function BackgroundWrapper({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/cantine.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {children}
    </div>
  );
}

