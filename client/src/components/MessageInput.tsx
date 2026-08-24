import { useState } from "react"

type Props = {
  onEncrypt: (message: string) => void
  loading: boolean
}

export default function MessageInput({ onEncrypt, loading }: Props) {
  const [message, setMessage] = useState("")

  return (
    <div style={{
      background: "#0D131F",
      borderRadius: "12px",
      padding: "1.5rem",
      borderLeft: "3px solid #3ED6C4",
      boxShadow: "0 4px 24px rgba(62, 214, 196, 0.05)",
      backgroundImage: `linear-gradient(to right, rgba(62,214,196,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(62,214,196,0.03) 1px, transparent 1px)`,
      backgroundSize: "20px 20px"
    }}>
      <h2 style={{
        color: "#3ED6C4",
        marginTop: 0,
        fontSize: "0.85rem",
        letterSpacing: "0.2em",
        fontFamily: "monospace"
      }}>
        ◈ MENSAJE A CIFRAR
      </h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe el mensaje que deseas cifrar..."
        rows={5}
        style={{
          width: "100%",
          background: "rgba(6, 8, 13, 0.8)",
          border: "1px solid rgba(62, 214, 196, 0.15)",
          borderRadius: "8px",
          color: "#e2e8f0",
          padding: "1rem",
          fontSize: "0.85rem",
          resize: "vertical",
          boxSizing: "border-box",
          fontFamily: "monospace",
          outline: "none"
        }}
      />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.8rem"
      }}>
        <span style={{ color: "#4a5568", fontSize: "0.75rem", fontFamily: "monospace" }}>
          {message.length} caracteres
        </span>
        <button
          onClick={() => onEncrypt(message)}
          disabled={loading || message.trim() === ""}
          style={{
            background: "transparent",
            color: loading ? "#4a5568" : "#3ED6C4",
            border: `1px solid ${loading ? "#2d3748" : "#3ED6C4"}`,
            padding: "0.6rem 1.5rem",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "monospace",
            fontSize: "0.8rem",
            letterSpacing: "0.15em"
          }}
        >
          {loading ? "CIFRANDO..." : "CIFRAR MENSAJE"}
        </button>
      </div>
    </div>
  )
}