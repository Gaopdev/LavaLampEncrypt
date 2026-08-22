import type{ EncryptionResponse } from "../types"

type Props = {
  result: EncryptionResponse | null
}

export default function ResultPanel({ result }: Props) {
  const copyToClipboard = () => {
    if (result?.message?.encrypted) {
      navigator.clipboard.writeText(result.message.encrypted)
    }
  }

  if (!result) {
    return (
      <div style={cardStyle}>
        <h2 style={{ color: "#00ccff", marginTop: 0 }}>ENCRYPTION RESULT</h2>
        <p style={{ color: "#6666aa" }}>WAITING FOR BACKEND DATA</p>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ color: "#00ccff", marginTop: 0 }}>ENCRYPTION RESULT</h2>

      <div style={{ marginBottom: "1rem" }}>
        <p style={{ color: "#6666aa", fontSize: "0.8rem", margin: "0 0 0.3rem" }}>
          ORIGINAL MESSAGE
        </p>
        <p style={{
          color: "#ffffff",
          background: "#050510",
          padding: "0.8rem",
          borderRadius: "6px"
        }}>
          {result.message?.original ?? "NOT AVAILABLE"}
        </p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <p style={{ color: "#6666aa", fontSize: "0.8rem", margin: "0 0 0.3rem" }}>
          ENCRYPTED MESSAGE
        </p>
        <p style={{
          color: "#00ff88",
          background: "#050510",
          padding: "0.8rem",
          borderRadius: "6px",
          fontFamily: "monospace",
          wordBreak: "break-all"
        }}>
          {result.message?.encrypted ?? "NOT AVAILABLE"}
        </p>
        <button onClick={copyToClipboard} style={{
          background: "transparent",
          border: "1px solid #00ff88",
          color: "#00ff88",
          padding: "0.3rem 0.8rem",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.8rem",
          marginTop: "0.5rem"
        }}>
          COPY
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem"
      }}>
        {[
          ["Algorithm", result.encryption?.algorithm],
          ["Status", result.status],
          ["Bits Generated", result.entropy?.samples],
          ["Frames Processed", result.entropy?.frames_processed],
        ].map(([label, value]) => (
          <div key={label} style={{
            background: "#050510",
            padding: "0.8rem",
            borderRadius: "6px"
          }}>
            <p style={{ color: "#6666aa", fontSize: "0.75rem", margin: "0 0 0.2rem" }}>
              {label}
            </p>
            <p style={{ color: "#ffffff", margin: 0, fontSize: "0.9rem" }}>
              {value ?? "NOT PROVIDED"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle = {
  background: "#0d0d1f",
  border: "1px solid #1a1a3a",
  borderRadius: "12px",
  padding: "1.5rem"
}