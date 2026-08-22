import cv2
import time

#Capturamos camara para frames
def capturar_frames(cantidad: int = 200):
    camara = cv2.VideoCapture(1)
    
    if not camara.isOpened():
        raise RuntimeError("No se abrio la camara")
    
    frames = []
    Intervalo_Captura = 0.2
    for _ in range(cantidad):
        ret, frame = camara.read()
        
        if not ret:
            print("No se pudo capturar el frame")
            break
        
        #Marcamos un area segura de captura
        alto, ancho, _ = frame.shape
        x = int(ancho * 0.30)
        y = int(alto * 0.20)
        roi_ancho = int(ancho * 0.40)
        roi_alto = int(alto * 0.60)
        roi = frame[
            y:y + roi_alto,
            x:x + roi_ancho
        ]
        roi_gris = convertir_gris(roi)
        frames.append(roi_gris.copy())
        time.sleep(Intervalo_Captura)
        
        cv2.rectangle(
            frame,
            (x, y),
            (x + roi_ancho, y + roi_alto),
            (0, 255, 0),
            2
        )
        
        cv2.imshow("Lavalamp - Camara", frame)
        cv2.imshow("ROI - Entropia", roi)
        
        tecla = cv2.waitKey(1) & 0xFF
        
        if tecla == ord("q"):
            break
        
    camara.release()
    cv2.destroyAllWindows()    
    return frames

def convertir_gris(frame):
    return cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

if __name__ == "__main__":
    capturar_frames()