import { useRef, useState } from "react"

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<"OFFLINE" | "CONNECTED">("OFFLINE")

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setStatus("CONNECTED")
    } catch {
      setStatus("OFFLINE")
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setStatus("OFFLINE")
  }

  return { videoRef, status, startCamera, stopCamera }
}