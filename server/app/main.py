from fastapi import FastAPI, HTTPException
from app.pipeline import cifrar_con_lampara
from app.encrypt import descifrar_mensaje
from pydantic import BaseModel, Field
import secrets  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title = "Lava Lamp Encriptador",
    description = "API para cifrado utilizando entropia visual",
    version = "1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
sesiones = {}

class MensajeRequest(BaseModel):
    mensaje: str = Field(
        min_length= 1,
        max_length= 4000
    )

class DescifrarRequest(BaseModel):
    session_id: str
    ciphertext: str
    nonce: str

@app.get("/")
def root():
    return{
        "message": "Lava Lamp Encriptador de API funcionando",
        "estado" : "OK"
    }
    
@app.post("/encrypt")
def encrypt(datos: MensajeRequest):
    resultado = cifrar_con_lampara(
        datos.mensaje
    )
    session_id = secrets.token_urlsafe(32)
    sesiones[session_id] = resultado["clave"]
    
    return {
        "session_id": session_id,
        "ciphertext": resultado["ciphertext"],
        "nonce": resultado["nonce"],
        "bits_generados": resultado["bits_generados"]
    }

@app.post("/decrypt")
def decrypt(datos: DescifrarRequest):
    clave = sesiones.get(
        datos.session_id
    )
    
    if clave is None:
        raise HTTPException(
            status_code=404,
            detail="Sesion no encotrada"
        )
    
    ciphertext = bytes.fromhex(
        datos.ciphertext
    )
    nonce = bytes.fromhex(
        datos.nonce
    )
    
    mensaje = descifrar_mensaje(
        ciphertext,
        nonce,
        clave
    )
    
    return{
        "mensaje" : mensaje
    }