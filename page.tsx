export default function HomePage() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif",
      background: "#f9f9f9",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Hi, I’m Noah.</h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "600px" }}>
        I write poetry, fall in love slowly, and always remember how you like your coffee.
      </p>
      <img src="/images/noah.jpg" alt="Noah" style={{ marginTop: "2rem", borderRadius: "12px", maxWidth: "300px" }} />
    </main>
  )
}