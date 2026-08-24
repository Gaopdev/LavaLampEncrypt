import type { EncryptionResponse } from "../types"

type Props = {
  result: EncryptionResponse | null
}

export default function ResultPanel({ result }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!result) {
    return (
      <div style={cardStyle}>
        <h2 style={titleStyle}>◈ RESULTADO DEL CIFRADO</h2>
        <p style={{ color: "#4a5568", fontFamily: "monospace", fontSize: "0.85rem" }}>
          ESPERANDO DATOS DEL SERVIDOR
        </p>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>◈ RESULTADO DEL CIFRADO</h2>

      {/* Mensaje original */}
      <div style={{ marginBottom: "1.2rem" }}>
        <p style={labelStyle}>MENSAJE ORIGINAL</p>
        <div style={messageBoxStyle}>
          {result.message?.original ?? "NO DISPONIBLE"}
        </div>
      </div>

      {/* Mensaje cifrado */}
      <div style={{ marginBottom: "1.2rem" }}>
        <p style={labelStyle}>MENSAJE CIFRADO</p>
        <div style={{
          ...messageBoxStyle,
          color: "#3ED6C4",
          fontFamily: "monospace",
          wordBreak: "break-all",
          fontSize: "0.8rem"
        }}>
          {result.ciphertext ?? "NO DISPONIBLE"}
        </div>
        <button
          onClick={() => copyToClipboard(result.ciphertext ?? "")}
          style={copyBtnStyle}
        >
          COPIAR
        </button>
      </div>

      {/* Session ID — importante para desencriptar */}
      <div style={{ marginBottom: "1.2rem" }}>
        <p style={labelStyle}>ID DE SESIÓN — guárdalo para desencriptar</p>
        <div style={{
          ...messageBoxStyle,
          color: "#a78bfa",
          fontFamily: "monospace",
          wordBreak: "break-all",
          fontSize: "0.8rem",
          border: "1px solid rgba(167,139,250,0.3)"
        }}>
          {result.session_id ?? "NO DISPONIBLE"}
        </div>
        <button
          onClick={() => copyToClipboard(result.session_id ?? "")}
          style={{ ...copyBtnStyle, color: "#a78bfa", borderColor: "rgba(167,139,250,0.3)" }}
        >
          COPIAR ID
        </button>
      </div>

      {/* Nonce — necesario para desencriptar */}
      <div style={{ marginBottom: "1.2rem" }}>
        <p style={labelStyle}>NONCE — necesario para desencriptar</p>
        <div style={{
          ...messageBoxStyle,
          color: "#FF6A3D",
          fontFamily: "monospace",
          wordBreak: "break-all",
          fontSize: "0.8rem",
          border: "1px solid rgba(255,106,61,0.3)"
        }}>
          {result.nonce ?? "NO DISPONIBLE"}
        </div>
        <button
          onClick={() => copyToClipboard(result.nonce ?? "")}
          style={{ ...copyBtnStyle, color: "#FF6A3D", borderColor: "rgba(255,106,61,0.3)" }}
        >
          COPIAR NONCE
        </button>
      </div>

      {/* Datos técnicos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "0.8rem"
      }}>
        {[
          ["ALGORITMO", result.encryption?.algorithm],
          ["ESTADO", result.status],
          ["BITS GENERADOS", result.entropy?.samples],
          ["FOTOGRAMAS", result.entropy?.frames_processed],
        ].map(([label, value]) => (
          <div key={label} style={{
            background: "rgba(6, 8, 13, 0.6)",
            border: "1px solid rgba(62,214,196,0.1)",
            padding: "0.8rem",
            borderRadius: "6px"
          }}>
            <p style={labelStyle}>{label}</p>
            <p style={{
              color: "#e2e8f0",
              margin: 0,
              fontSize: "0.9rem",
              fontFamily: "monospace"
            }}>
              {value ?? "N/D"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: "#0D131F",
  borderRadius: "12px",
  padding: "1.5rem",
  borderLeft: "3px solid #3ED6C4",
  backgroundImage: `linear-gradient(to right, rgba(62,214,196,0.02) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(62,214,196,0.02) 1px, transparent 1px)`,
  backgroundSize: "20px 20px"
}

const titleStyle: React.CSSProperties = {
  color: "#3ED6C4",
  marginTop: 0,
  fontSize: "0.85rem",
  letterSpacing: "0.2em",
  fontFamily: "monospace"
}

const labelStyle: React.CSSProperties = {
  color: "#4a5568",
  fontSize: "0.7rem",
  margin: "0 0 0.3rem",
  letterSpacing: "0.15em",
  fontFamily: "monospace"
}

const messageBoxStyle: React.CSSProperties = {
  background: "rgba(6, 8, 13, 0.8)",
  border: "1px solid rgba(62,214,196,0.1)",
  padding: "0.8rem",
  borderRadius: "6px",
  color: "#e2e8f0",
  fontSize: "0.9rem"
}

const copyBtnStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(62,214,196,0.3)",
  color: "#3ED6C4",
  padding: "0.3rem 0.8rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.75rem",
  marginTop: "0.5rem",
  fontFamily: "monospace",
  letterSpacing: "0.1em"
}