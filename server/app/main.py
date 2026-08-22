from fastapi import FastAPI
from app.pipeline import cifrar_con_lampara

app = FastAPI(
    title = "Lava Lamp Encriptador",
    description = "API para cifrado utilizando entropia visual",
    version = "1.0"
)

@app.get("/")
def root():
    return{
        "message": "Lava Lamp Encriptador de API funcionando",
        "estado" : "OK"
    }
    
@app.post("/encrypt")
def encrypt(mensaje: str):
    resultado = cifrar_con_lampara(
        mensaje
    )
    return resultado