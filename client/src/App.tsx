import { useState } from "react"
import Header from "./components/Header"
import CameraPanel from "./components/CameraPanel"
import MessageInput from "./components/MessageInput"
import ResultPanel from "./components/ResultPanel"
import DecryptPanel from "./components/DecryptPanel"
import type { EncryptionResponse } from "./types"

export default function App() {
  const [result, setResult] = useState<EncryptionResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEncrypt = async (message: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/encrypt`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mensaje: message })
        }
      )
      const data = await res.json()
      setResult({
        status: "success",
        session_id: data.session_id,
        ciphertext: data.ciphertext,
        nonce: data.nonce,
        message: {
          original: message,
          encrypted: data.ciphertext
        },
        encryption: {
          algorithm: "AES-256-GCM",
          processing_time_ms: 0
        },
        entropy: {
          value: 0,
          samples: data.bits_generados,
          frames_processed: 200
        }
      })
    } catch {
      setResult({ status: "ERROR - Servidor no disponible" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: "#06080D",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "monospace"
    }}>
      <Header />
      <div style={{
        width: "100%",
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
          <CameraPanel isEncrypting={loading}/>
          <MessageInput onEncrypt={handleEncrypt} loading={loading} />
        </div>
        <ResultPanel result={result} />
        <DecryptPanel />
      </div>
    </div>
  )
}