import { useState } from "react"

export default function DecryptPanel() {
  const [ciphertext, setCiphertext] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [nonce, setNonce] = useState("")
  const [resultado, setResultado] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDecrypt = async () => {
    if (!ciphertext.trim() || !sessionId.trim() || !nonce.trim()) return
    
    setLoading(true)
    setError(null)
    setResultado(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/decrypt`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            ciphertext: ciphertext,
            nonce: nonce
          })
        }
      )

      if (!res.ok) {
        const err = await res.json()
        setError(err.detail ?? "Sesión no encontrada o datos inválidos")
        return
      }

      const data = await res.json()
      setResultado(data.mensaje)
    } catch {
      setError("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: "#0D131F",
      borderRadius: "12px",
      padding: "1.5rem",
      borderLeft: "3px solid #a78bfa",
      boxShadow: "0 4px 24px rgba(167, 139, 250, 0.05)",
      backgroundImage: `linear-gradient(to right, rgba(167,139,250,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(167,139,250,0.02) 1px, transparent 1px)`,
      backgroundSize: "20px 20px"
    }}>
      <h2 style={{
        color: "#a78bfa",
        marginTop: 0,
        fontSize: "0.85rem",
        letterSpacing: "0.2em",
        fontFamily: "monospace"
      }}>
        ◈ PANEL DE DESENCRIPTACIÓN
      </h2>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <p style={labelStyle}>ID DE SESIÓN</p>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Ingresa el ID de sesión..."
            style={inputStyle}
          />
        </div>

        <div>
          <p style={labelStyle}>TEXTO ENCRIPTADO</p>
          <input
            type="text"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            placeholder="Ingresa el texto encriptado..."
            style={inputStyle}
          />
        </div>

        <div>
          <p style={labelStyle}>NONCE</p>
          <input
            type="text"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
            placeholder="Ingresa el nonce..."
            style={inputStyle}
          />
        </div>
      </div>

      <button
        onClick={handleDecrypt}
        disabled={loading || !ciphertext.trim() || !sessionId.trim() || !nonce.trim()}
        style={{
          background: "transparent",
          color: loading ? "#4a5568" : "#a78bfa",
          border: `1px solid ${loading ? "#2d3748" : "#a78bfa"}`,
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.15em"
        }}
      >
        {loading ? "DESENCRIPTANDO..." : "DESENCRIPTAR MENSAJE"}
      </button>

      {error && (
        <div style={{
          marginTop: "1rem",
          background: "rgba(255, 77, 106, 0.1)",
          border: "1px solid rgba(255, 77, 106, 0.3)",
          borderRadius: "6px",
          padding: "0.8rem",
          color: "#FF4D6A",
          fontSize: "0.85rem",
          fontFamily: "monospace"
        }}>
          ⚠ {error}
        </div>
      )}

      {resultado && (
        <div style={{ marginTop: "1rem" }}>
          <p style={labelStyle}>MENSAJE DESENCRIPTADO</p>
          <div style={{
            background: "rgba(6, 8, 13, 0.8)",
            border: "1px solid rgba(167,139,250,0.2)",
            padding: "0.8rem",
            borderRadius: "6px",
            color: "#a78bfa",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            textShadow: "0 0 10px rgba(167,139,250,0.3)"
          }}>
            {resultado}
          </div>
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  color: "#4a5568",
  fontSize: "0.7rem",
  margin: "0 0 0.4rem",
  letterSpacing: "0.15em",
  fontFamily: "monospace"
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(6, 8, 13, 0.8)",
  border: "1px solid rgba(167,139,250,0.15)",
  borderRadius: "8px",
  color: "#e2e8f0",
  padding: "0.7rem 1rem",
  fontSize: "0.85rem",
  boxSizing: "border-box",
  fontFamily: "monospace",
  outline: "none"
}