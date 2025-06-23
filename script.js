/**
 * CodeCraft: Script para la experiencia de Realidad Aumentada de Corvaglia.
 *
 * v4.0 - Solución Definitiva de Activación por Evento
 * Se adopta el patrón de inicialización post-clic para máxima compatibilidad móvil.
 * Los listeners de AR se activan solo DESPUÉS de que el usuario da permiso a la cámara,
 * evitando así las condiciones de carrera en Safari (iOS).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos todos los elementos que vamos a necesitar
    const loadingScreen = document.getElementById('loading-screen');
    const startButton = document.getElementById('start-button');
    const infoPanel = document.getElementById('info-panel');
    const marker = document.getElementById('marker-corvaglia');
    const arVideoEntity = document.getElementById('ar-video'); // La entidad <a-video> o <a-box>
    const videoAsset = document.getElementById('video-corvaglia'); // El elemento <video> real

    // El único evento que escuchamos al principio es el clic en el botón de inicio.
    startButton.addEventListener('click', () => {
        // 1. Solicitamos acceso a la cámara.
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                // 2. Si el usuario da permiso, ocultamos la pantalla de carga.
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);

                console.log('Permiso de cámara concedido. Activando listeners de AR...');

                // 3. ¡LA CLAVE ESTÁ AQUÍ!
                // Solo ahora que la cámara está activa, le decimos al sistema que empiece
                // a escuchar los eventos del marcador AR.
                
                marker.addEventListener('markerFound', () => {
                    console.log('Marcador encontrado');
                    infoPanel.textContent = '¡Marcador detectado!';

                    // Esta lógica funcionará tanto si el #ar-video es un <a-video> o un <a-box>
                    arVideoEntity.setAttribute('visible', true);
                    
                    // Si el video existe, lo reproducimos
                    if (videoAsset) {
                        videoAsset.play();
                    }
                });

                marker.addEventListener('markerLost', () => {
                    console.log('Marcador perdido');
                    infoPanel.textContent = 'Apunta la cámara hacia la imagen del marcador';
                    
                    arVideoEntity.setAttribute('visible', false);

                    // Si el video existe, lo pausamos
                    if (videoAsset) {
                        videoAsset.pause();
                    }
                });
                
                infoPanel.textContent = "Apunta la cámara hacia la imagen del marcador";
            })
            .catch(error => {
                // 4. Si el usuario niega el permiso, mostramos un error.
                console.error("Error al acceder a la cámara:", error);
                infoPanel.textContent = "Error: Se necesita acceso a la cámara para la experiencia AR.";
                infoPanel.style.backgroundColor = "rgba(255, 50, 50, 0.8)";
            });
    });
});
