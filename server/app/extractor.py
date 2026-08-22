import hashlib

def acondicionador_entropia(datos: bytes) -> bytes:
    #Recibimos lo bytes de nuestra fuente y los procesamos con SHAS-256
    resultado = hashlib.sha256(datos).digest()
    
    return resultado

if __name__ == "__main__":

    datos = b"Entropia de la lamparb"

    resultado = acondicionador_entropia(datos)

    print("Entrada:")
    print(datos)

    print("\nSHA-256:")
    print(resultado.hex())

    print("\nCantidad de bytes:")
    print(len(resultado))