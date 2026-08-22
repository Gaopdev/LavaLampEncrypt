import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def cifrar_mensaje(mensaje: str, clave:  bytes) -> dict:
    #Ciframos el mensaje con la clave
    if len(clave) != 32:
        raise ValueError("La clave debe tener 32 bytes")
    
    datos = mensaje.encode("utf-8")
    nonce = os.urandom(12)
    aes = AESGCM(clave)
    
    ciphertext = aes.encrypt(
        nonce,
        datos,
        None
    )
    return {
        "ciphertext": ciphertext,
        "nonce": nonce
    }

def descifrar_mensaje(ciphertext: bytes, nonce:bytes, clave:bytes) -> str:
    #descifrador de texto
    if len(clave) != 32:
        raise ValueError("La clave debe tener 32 bits")
    
    aes = AESGCM(clave)
    datos = aes.decrypt(
        nonce,
        ciphertext,
        None
    )
    
    return datos.decode("utf-8")

#COmprobacion Borrar despues
if __name__ == "__main__":

    clave = os.urandom(32)

    mensaje_original = "Hola, esta es una prueba de la lámpara"

    resultado = cifrar_mensaje(
        mensaje_original,
        clave
    )
    ciphertext_modificado = bytearray(
    resultado["ciphertext"]
    )

    ciphertext_modificado[0] ^= 1

    mensaje_descifrado = descifrar_mensaje(
        resultado["ciphertext"],
        resultado["nonce"],
        clave
    )

    print("=== PRUEBA AES-256-GCM ===")

    print("\nMensaje original:")
    print(mensaje_original)

    print("\nClave:")
    print(clave.hex())

    print("\nNonce:")
    print(resultado["nonce"].hex())

    print("\nMensaje cifrado:")
    print(resultado["ciphertext"].hex())

    print("\nMensaje descifrado:")
    print(mensaje_descifrado)

    print("\n¿Coinciden?")
    print(mensaje_original == mensaje_descifrado)