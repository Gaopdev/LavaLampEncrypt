import { useState } from "react"
import Header from "./components/Header"
import CameraPanel from "./components/CameraPanel"
import MessageInput from "./components/MessageInput"
import ResultPanel from "./components/ResultPanel"
import type { EncryptionResponse } from "./types"
import { encryptMessage } from "./services/api"

export default function App() {
  const [result, setResult] = useState<EncryptionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [originalMessage, setOriginalMessage] = useState("")

  const handleEncrypt = async (message: string) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setOriginalMessage(message)

    try {
      const res = await encryptMessage(message)
      setResult(res)

    } catch {
      if(error instanceof Error){
        setError(error.message)
      }else{
        setError("Se desconoce el Error")
      }
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
        <ResultPanel result={result} originalMessage={originalMessage} />
      </div>
    </div>
  )
}