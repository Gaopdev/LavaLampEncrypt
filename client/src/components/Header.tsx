import { useEffect, useState } from "react"

export default function Header() {
  const [backendStatus, setBackendStatus] = useState<"EN LÍNEA" | "FUERA DE LÍNEA" | "CONECTANDO">("CONECTANDO")

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/`)
        if (res.ok) setBackendStatus("EN LÍNEA")
        else setBackendStatus("FUERA DE LÍNEA")
      } catch {
        setBackendStatus("FUERA DE LÍNEA")
      }
    }
    checkBackend()
  }, [])

  const statusColor = {
    "EN LÍNEA": "#3ED6C4",
    "FUERA DE LÍNEA": "#FF4D6A",
    "CONECTANDO": "#ffaa00"
  }[backendStatus]

  return (
    <header style={{
      background: "#06080D",
      padding: "1.2rem 2rem",
      borderBottom: "1px solid rgba(62, 214, 196, 0.15)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h1 style={{
          color: "#3ED6C4",
          margin: 0,
          fontSize: "1.8rem",
          letterSpacing: "0.25em",
          fontFamily: "monospace",
          textShadow: "0 0 20px rgba(62, 214, 196, 0.4)"
        }}>
          LAVACRYPT
        </h1>
        <p style={{ color: "#4a5568", margin: 0, fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "monospace" }}>
          Sistema Criptográfico de Entropía Visual
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ color: statusColor, fontSize: "0.8rem" }}>●</span>
        <span style={{ color: statusColor, fontSize: "0.85rem", letterSpacing: "0.15em", fontFamily: "monospace" }}>
          SISTEMA {backendStatus}
        </span>
      </div>
    </header>
  )
}