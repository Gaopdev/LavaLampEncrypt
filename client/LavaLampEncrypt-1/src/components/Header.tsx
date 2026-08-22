import { useEffect, useState } from "react"

export default function Header() {
  const [backendStatus, setBackendStatus] = useState<"ONLINE" | "OFFLINE" | "CONNECTING">("CONNECTING")

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/`)
        if (res.ok) setBackendStatus("ONLINE")
        else setBackendStatus("OFFLINE")
      } catch {
        setBackendStatus("OFFLINE")
      }
    }
    checkBackend()
  }, [])

  const color = {
    ONLINE: "#00ff88",
    OFFLINE: "#ff4444",
    CONNECTING: "#ffaa00"
  }[backendStatus]

  return (
    <header style={{
      background: "#0a0a1a",
      padding: "1.5rem 2rem",
      borderBottom: "1px solid #1a1a3a",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h1 style={{ color: "#00ccff", margin: 0, fontSize: "2rem", letterSpacing: "0.2em" }}>
          LAVACRYPT
        </h1>
        <p style={{ color: "#6666aa", margin: 0, fontSize: "0.8rem" }}>
          Lava Entropy Cryptographic System
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ color, fontSize: "1.2rem" }}>●</span>
        <span style={{ color, fontSize: "0.9rem", letterSpacing: "0.1em" }}>
          SYSTEM {backendStatus}
        </span>
      </div>
    </header>
  )
}