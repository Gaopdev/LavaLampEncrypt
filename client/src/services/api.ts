import type { EncryptionResponse } from "../types";

export const API_URL = import.meta.env.VITE_API_URL;

export async function encryptMessage(message: string): Promise<EncryptionResponse>{
    
    const response = await fetch(`${API_URL}/encrypt`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mensaje: message
        })
    })

    if(!response.ok){
        const error = await response.json()

        throw new Error(
            error.detail || "Error encriptando el mesnaje"
        )
    }

    return response.json()
}