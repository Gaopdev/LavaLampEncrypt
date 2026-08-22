from app.camera import capturar_frames
from app.entropy import analizar_frames, calcular_entropia, analizar_bits, extraer_bits, extracto_von_neumann, extraer_diferencias_bloques
from app.test_randomness import prueba_frecuencia, prueba_runs, prueba_autocorrelacion, analizar_longitud_runs

def main():
    print("Iniciando Captura")
    
    frames = capturar_frames(100)
    
    print("Frames Capturados: ", len(frames))
    
    diferencias = extraer_diferencias_bloques(
        frames,
        filas=4,
        columnas=4
    )
    print("Cantidad de diferencias:", len(diferencias))
    
    entropia = calcular_entropia(diferencias)
    
    print(
        "Entropia Temporal de la lampara: ",
        entropia,
        "bits por simbolo"
    )
    
    bits = extraer_bits(diferencias)

    bits = extraer_bits(diferencias)

    print("\n--- BITS ORIGINALES ---")

    analizar_bits(bits)

    bits_limpios = extracto_von_neumann(bits)
    
    prueba_frecuencia(bits_limpios)

    prueba_runs(bits_limpios)

    prueba_autocorrelacion(bits_limpios)
    analizar_longitud_runs(bits_limpios)
    
if __name__ == "__main__":
    main()