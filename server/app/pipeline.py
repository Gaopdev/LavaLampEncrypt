import hashlib 
import numpy as np
from app.bits_to_bytes import bits_a_bytes
from app.encrypt import cifrar_mensaje, descifrar_mensaje
from app.entropy import obtener_bits_desde_frames
from app.camera import capturar_frames

def generar_clave(bits):
    #Convertimos los datos obtenidos en la clave
    datos = bits_a_bytes(bits)
    
    if len(datos) == 0:
        raise ValueError("No se obtuvieron suficientes bits")
    
    clave = hashlib.sha256(datos).digest()
    
    return clave

def cifrar_con_lampara(mensaje: str):
    #Capturar lampara, gera una clave y cifra el mensaje.
    print("Iniciando captura")
    
    frames = capturar_frames(cantidad=200)
    
    if len(frames) < 2:
        raise ValueError("No se capturaron suficientes frames")
    
    print("Frames obtenidos: ", len(frames))
    print("Extrayendo Entropia")
    
    bits = obtener_bits_desde_frames(frames)
    
    print("Bits despues de Von neumann: ", len(bits))
    
    if len(bits) < 256:
        raise ValueError("No se registraros suficientes bits")
    
    clave = generar_clave(bits)
    resultado = cifrar_mensaje(
        mensaje,
        clave
    )
    
    return {
        "ciphertext" : resultado["ciphertext"].hex(),
        "nonce" : resultado["nonce"].hex(),
        "bits_generados" : len(bits),
        "clave" : clave
    }
