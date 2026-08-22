import { useState } from "react"

type Props = {
  onEncrypt: (message: string) => void
  loading: boolean
}

export default function MessageInput({ onEncrypt, loading }: Props) {
  const [message, setMessage] = useState("")

  return (
    <div style={{
      background: "#0d0d1f",
      border: "1px solid #1a1a3a",
      borderRadius: "12px",
      padding: "1.5rem"
    }}>
      <h2 style={{ color: "#00ccff", marginTop: 0 }}>MESSAGE TO ENCRYPT</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter the message you want to encrypt..."
        rows={4}
        style={{
          width: "100%",
          background: "#050510",
          border: "1px solid #1a1a3a",
          borderRadius: "8px",
          color: "#ffffff",
          padding: "1rem",
          fontSize: "0.9rem",
          resize: "vertical",
          boxSizing: "border-box"
        }}
      />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.5rem"
      }}>
        <span style={{ color: "#6666aa", fontSize: "0.8rem" }}>
          {message.length} characters
        </span>
        <button
          onClick={() => onEncrypt(message)}
          disabled={loading || message.trim() === ""}
          style={{
            background: loading ? "#333" : "#00ccff",
            color: "#000",
            border: "none",
            padding: "0.7rem 1.5rem",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            letterSpacing: "0.1em"
          }}
        >
          {loading ? "ENCRYPTING..." : "ENCRYPT MESSAGE"}
        </button>
      </div>
    </div>
  )
}