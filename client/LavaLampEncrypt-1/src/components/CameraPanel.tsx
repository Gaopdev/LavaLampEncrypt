import { useCamera } from "../hooks/useCamera"

export default function CameraPanel() {
  const { videoRef, status, startCamera, stopCamera } = useCamera()

  return (
    <div style={{
      background: "#0d0d1f",
      border: "1px solid #1a1a3a",
      borderRadius: "12px",
      padding: "1.5rem"
    }}>
      <h2 style={{ color: "#00ccff", marginTop: 0 }}>CAMERA PANEL</h2>
      <p style={{ color: status === "CONNECTED" ? "#00ff88" : "#ff4444", fontSize: "0.85rem" }}>
        ● CAMERA {status}
      </p>

      {status === "OFFLINE" ? (
        <div style={{
          width: "100%", minHeight: "200px", background: "#050510",
          borderRadius: "8px", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#333"
        }}>
          CAMERA OFFLINE
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "100%", borderRadius: "8px", background: "#000" }}
        />
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={startCamera} style={btnStyle("#00ccff")}>
          START CAMERA
        </button>
        <button onClick={stopCamera} style={btnStyle("#ff4444")}>
          STOP CAMERA
        </button>
      </div>

      <p style={{ color: "#6666aa", fontSize: "0.75rem", marginTop: "1rem" }}>
        * La cámara física es capturada por el backend al encriptar
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
  fontSize: "0.8rem",
  letterSpacing: "0.1em"
})