/**
 * CodeCraft: Script para la experiencia de Realidad Aumentada de Corvaglia.
 *
 * v3.0 - Solución Definitiva de Sincronización
 * Se añade un listener para el evento 'loaded' de la escena de A-Frame
 * para solucionar el error "No canvas available" en navegadores móviles.
 */

window.addEventListener('load', () => {
    const sceneEl = document.querySelector('a-scene');
    
    // Verificamos si la escena ya se cargó por algún motivo.
    // Si no, esperamos a que nos avise con el evento 'loaded'.
    if (sceneEl.hasLoaded) {
        run();
    } else {
        sceneEl.addEventListener('loaded', run);
    }
});

function run() {
    // Todo nuestro código anterior ahora se ejecuta aquí,
    // con la garantía de que la escena está lista.

    // ===== ELEMENTOS DEL DOM =====
    const loadingScreen = document.getElementById('loading-screen');
    const startButton = document.getElementById('start-button');
    const infoPanel = document.getElementById('info-panel');
    const marker = document.getElementById('marker-corvaglia');
    const arVideo = document.getElementById('ar-video');
    const videoAsset = document.getElementById('video-corvaglia');

    // ===== MANEJO DE LA PANTALLA DE CARGA =====
    startButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
                infoPanel.textContent = "Apunta la cámara hacia la imagen del marcador";
            })
            .catch(error => {
                console.error("Error al acceder a la cámara:", error);
                infoPanel.textContent = "Error: Se necesita acceso a la cámara para la experiencia AR.";
                infoPanel.style.backgroundColor = "rgba(255, 50, 50, 0.8)";
            });
    });

    // ===== CONTROL DE MARCADORES =====
    marker.addEventListener('markerFound', () => {
        console.log('Marcador encontrado');
        infoPanel.textContent = '¡Marcador detectado!';
        arVideo.setAttribute('visible', true);
        videoAsset.play();
    });

    marker.addEventListener('markerLost', () => {
        console.log('Marcador perdido');
        infoPanel.textContent = 'Apunta la cámara hacia la imagen del marcador';
        arVideo.setAttribute('visible', false);
        videoAsset.pause();
    });

    console.log('Sistema AR inicializado correctamente después de la carga de la escena.');
}
