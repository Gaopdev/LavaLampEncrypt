import cv2
import numpy as np

def analizar_imagen(ruta_imagen: str) ->dict:
    imagen = cv2.imread(ruta_imagen)
    
    if imagen is None:
        raise ValueError("No se pudo cargar la imagen")
    
    altura, ancho, canales = imagen.shape
    
    promedio = np.mean(imagen)
    desviacion = np.std(imagen)
    
    return{
        "ancho" : ancho,
        "alto" : altura,
        "canales" : canales,
        "promedio" : promedio,
        "desviacion" : desviacion
    }

#Extraer bytes de la imagen
def extraer_bytes_imagen(imagen: np.ndarray) -> bytes:
    datos = imagen.flatten()
    
    return datos.tobytes()

#Diferencias
def extraer_diferencias(imagen: np.ndarray) -> np.ndarray:
    datos = imagen.flatten()
    diferencias = np.diff(datos.astype(np.int16))
    
    return diferencias

#Calcular entropy de Shannon
def calcular_entropia(datos: np.ndarray) -> float:
    valores, cantidades = np.unique(datos, return_counts=True)
    
    total = np.sum(cantidades)
    
    probabilidades = cantidades.astype(np.float64) / total
    
    entropia = 0.0
    
    for probabilidad in probabilidades:
        if probabilidad > 0:
            entropia -= probabilidad * np.log2(probabilidad)
            
    print("Valores diferentes:", len(valores))
    print("Total de datos:", total)
    
    return float(entropia)

#Diferencias entre frames
def diferencias_entre_frames(frame_anterior: np.ndarray, 
                            frame_actual: np.ndarray) -> np.ndarray:
    anterior = frame_anterior.astype(np.int16)
    actual = frame_actual.astype(np.int16)
    
    diferencias = actual - anterior
    
    return diferencias.flatten()

#Analisis temporal de imagen
def analizar_frames(frames: list[np.ndarray]) -> np.ndarray:
    todas_diferencias = []
    
    for i in range(1, len(frames)):
        diferencias = diferencias_entre_frames(
            frames[i - 1],
            frames[i]
        )
        todas_diferencias.append(diferencias)
    
    if not todas_diferencias:
        raise ValueError("No hay suficientes Frames para analizar")

    return np.concatenate(todas_diferencias)


#Ectraer bits
def extraer_bits(diferencias: np.ndarray) -> np.ndarray:
    bits = diferencias % 2
    return bits.astype(np.uint8)

#Exrtactor von man
def extracto_von_neumann(bits: np.ndarray) -> np.ndarray:
    cantidad_pares = len(bits) // 2
    bits = bits[:cantidad_pares * 2]
    pares = bits.reshape(-1, 2)
    salida = []
    
    for par in pares:
        if par[0] == 0 and par[1] == 1:
            salida.append(0)
            
        elif par[0] == 1 and par[1] == 0:
            salida.append(1)
    return np.array(salida, dtype=np.uint8)
    
def extraer_diferencias_bloques(
    frames,
    filas=4,
    columnas=4
):
    diferencias = []
    alto, ancho = frames[0].shape[:2]

    alto_bloque = alto // filas
    ancho_bloque = ancho // columnas

    for i in range(0, len(frames) - 1, 2):
        frame_anterior = frames[i]
        frame_actual = frames[i + 1]

        medias_anterior = []
        medias_actuales = []

        for fila in range(filas):
            for columna in range(columnas):
                y1 = fila * alto_bloque
                y2 = (fila + 1) * alto_bloque

                x1 = columna * ancho_bloque
                x2 = (columna + 1) * ancho_bloque

                bloque_anterior = frame_anterior[
                    y1:y2,
                    x1:x2
                ]
                bloque_actual = frame_actual[
                    y1:y2,
                    x1:x2
                ]

                media_anterior = np.mean(
                    bloque_anterior
                )
                media_actual = np.mean(
                    bloque_actual
                )
                medias_anterior.append(
                    media_anterior
                )
                medias_actuales.append(
                    media_actual
                )

        for anterior, actual in zip(medias_anterior, medias_actuales):
            diferencia = actual - anterior
            diferencias.append(
                diferencia
            )
    return np.array(diferencias)

def obtener_bits_desde_frames(frames):
    diferencias = extraer_diferencias_bloques(
        frames,
        filas = 4,
        columnas = 4
    )
    bits = extraer_bits(diferencias)
    bits_limpios = extracto_von_neumann(bits)
    
    return bits_limpios

#Comprobacion de que funciona
if __name__ == "__main__":
    print("Prueba de extracción de entropía")