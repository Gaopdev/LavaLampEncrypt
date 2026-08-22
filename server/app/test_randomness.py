import numpy as np
from scipy.stats import norm

def prueba_frecuencia(bits: np.ndarray):
    cantidad_unos = np.sum(bits)
    cantidad_total = len(bits)

    proporcion_unos = cantidad_unos / cantidad_total

    desviacion = abs(proporcion_unos - 0.5)

    print("\n--- PRUEBA DE FRECUENCIA ---")

    print("Total de bits:", cantidad_total)
    print("Cantidad de 0:", cantidad_total - cantidad_unos)
    print("Cantidad de 1:", cantidad_unos)

    print("Proporción de 1:", proporcion_unos)
    print("Desviación respecto a 50%:", desviacion)

    return proporcion_unos

def prueba_runs(bits: np.ndarray):
    n = len(bits)

    cantidad_unos = int(np.sum(bits))
    cantidad_ceros = n - cantidad_unos

    print("\n--- PRUEBA DE RUNS ---")

    print("Cantidad de bits:", n)
    print("Cantidad de 0:", cantidad_ceros)
    print("Cantidad de 1:", cantidad_unos)

    # No se puede realizar la prueba si todos los bits son iguales
    if cantidad_unos == 0 or cantidad_ceros == 0:
        print("No se puede realizar la prueba de runs.")
        return None

    # Contar cambios entre bits consecutivos
    cambios = int(np.sum(bits[1:] != bits[:-1]))

    runs = cambios + 1

    # Número esperado de runs
    media = (
        1
        + (2 * cantidad_unos * cantidad_ceros) / n
    )

    # Varianza esperada
    varianza = (
        2
        * cantidad_unos
        * cantidad_ceros
        * (
            2 * cantidad_unos * cantidad_ceros - n
        )
        / (
            n ** 2
            * (n - 1)
        )
    )

    varianza = float(varianza)

    if varianza <= 0:
        print("La varianza no es válida:", varianza)
        return None

    desviacion = np.sqrt(varianza)

    # Estadístico Z
    z = (runs - media) / desviacion

    # p-value bilateral
    p_value = 2 * norm.sf(abs(z))

    print("Runs observados:", runs)
    print("Runs esperados:", media)
    print("Varianza:", varianza)
    print("Desviación estándar:", desviacion)
    print("Z:", z)
    print("p-value:", p_value)

    return p_value

def prueba_autocorrelacion(bits: np.ndarray):
    primeros = bits[:-1]
    siguientes = bits[1:]

    correlacion = np.corrcoef(
        primeros,
        siguientes
    )[0, 1]

    print("\n--- AUTOCORRELACIÓN ---")

    print(
        "Correlación entre bits consecutivos:",
        correlacion
    )

    return correlacion

def analizar_longitud_runs(bits: np.ndarray):
    if len(bits) == 0:
        return

    longitudes = []

    longitud_actual = 1

    for i in range(1, len(bits)):
        if bits[i] == bits[i - 1]:
            longitud_actual += 1
        else:
            longitudes.append(longitud_actual)
            longitud_actual = 1

    longitudes.append(longitud_actual)

    longitudes = np.array(longitudes)

    print("\n--- LONGITUD DE RUNS ---")

    print("Run mínimo:", np.min(longitudes))
    print("Run máximo:", np.max(longitudes))
    print("Run promedio:", np.mean(longitudes))

    valores, cantidades = np.unique(
        longitudes,
        return_counts=True
    )

    print("\nDistribución de runs:")

    for valor, cantidad in zip(valores[:20], cantidades[:20]):
        print(
            f"Longitud {valor}: {cantidad}"
        )

    return longitudes