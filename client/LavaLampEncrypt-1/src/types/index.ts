export type EncryptionResponse = {
  status: string
  message?: {
    original: string
    encrypted: string
  }
  encryption?: {
    algorithm: string
    processing_time_ms: number
  }
  entropy?: {
    value: number
    samples: number
    frames_processed: number
  }
}