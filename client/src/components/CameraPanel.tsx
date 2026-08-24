import { useCamera } from "../hooks/useCamera"

export default function CameraPanel() {
  const { videoRef, status, startCamera, stopCamera } = useCamera()

  const statusText = status === "CONNECTED" ? "CONECTADA" : "DESCONECTADA"

  return (
    <div style={{
      background: "#0D131F",
      borderRadius: "12px",
      padding: "1.5rem",
      borderLeft: "3px solid #FF6A3D",
      boxShadow: "0 4px 24px rgba(255, 106, 61, 0.08)"
    }}>
      <h2 style={{
        color: "#FF6A3D",
        marginTop: 0,
        fontSize: "0.85rem",
        letterSpacing: "0.2em",
        fontFamily: "monospace"
      }}>
        ◈ PANEL DE CÁMARA
      </h2>

      <p style={{
        color: status === "CONNECTED" ? "#3ED6C4" : "#FF4D6A",
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem"
      }}>
        ● CÁMARA {statusText}
      </p>

      {status === "OFFLINE" ? (
        <div style={{
          width: "100%",
          minHeight: "200px",
          background: "#050510",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2a3a4a",
          fontSize: "0.8rem",
          letterSpacing: "0.2em",
          backgroundImage: `linear-gradient(to right, rgba(255,106,61,0.03) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,106,61,0.03) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}>
          CÁMARA DESCONECTADA
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "100%",
            borderRadius: "8px",
            background: "#000",
            border: "1px solid rgba(255,106,61,0.2)"
          }}
        />
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={startCamera} style={btnStyle("#FF6A3D")}>
          INICIAR CÁMARA
        </button>
        <button onClick={stopCamera} style={btnStyle("#4a5568")}>
          DETENER CÁMARA
        </button>
      </div>

      <p style={{ color: "#2d3748", fontSize: "0.7rem", marginTop: "0.8rem", fontFamily: "monospace" }}>
        * El servidor captura la cámara física al cifrar
      </p>
    </div>
  )
}

const btnStyle = (color: string) => ({
  background: "transparent",
  border: `1px solid ${color}`,
  color,
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  fontFamily: "monospace"
})