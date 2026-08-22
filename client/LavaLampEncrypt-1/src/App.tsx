import { useState } from "react"
import Header from "./components/Header"
import CameraPanel from "./components/CameraPanel"
import MessageInput from "./components/MessageInput"
import ResultPanel from "./components/ResultPanel"
import type { EncryptionResponse } from "./types"

export default function App() {
  const [result, setResult] = useState<EncryptionResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEncrypt = async (message: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/encrypt?mensaje=${encodeURIComponent(message)}`,
        { method: "POST" }
      )
      const data = await res.json()
      setResult({
        status: "success",
        message: { original: message, encrypted: data.ciphertext },
        encryption: { algorithm: "AES-256-GCM", processing_time_ms: 0 },
        entropy: { value: 0, samples: data.bits_generados, frames_processed: 200 }
      })
    } catch {
      setResult({ status: "ERROR - Backend unavailable" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #050510 0%, #0a0a2e 100%)",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "'Courier New', monospace"
    }}>
      <Header />
      <div style={{
        width: "100%",
        maxWidth: "100%",
        padding: "2rem",
        boxSizing: "border-box",
        display: "grid",
        gap: "1.5rem"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          <CameraPanel />
          <MessageInput onEncrypt={handleEncrypt} loading={loading} />
        </div>
        <ResultPanel result={result} />
      </div>
    </div>
  )
}