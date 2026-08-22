import numpy as np

def bits_a_bytes(bits):
    #Convertimos la secuencias de bits a bytes
    bits = np.asarray(bits, dtype=np.uint8)
    cantidad_completa = (len(bits)//8)*8
    
    bits = bits[:cantidad_completa]
    bits = bits.reshape(-1, 8)
    
    bytes_resultado = np.packbits(bits, axis=1)
    
    return bytes_resultado.flatten().tobytes()

if __name__== "__main__":

    bits_prueba = np.array([
        0, 1, 0, 0,
        1, 1, 0, 1
    ])

    resultado = bits_a_bytes(bits_prueba)

    print("Bits:")
    print(bits_prueba)

    print("Bytes:")
    print(resultado)

    print("Hexadecimal:")
    print(resultado.hex())