/**
 * CodeCraft: Script para la experiencia de Realidad Aumentada de Corvaglia.
 *
 * Funcionalidades:
 * 1. Gestionar la pantalla de carga y el inicio de la experiencia.
 * 2. Controlar la visibilidad y reproducción del video al encontrar/perder el marcador.
 */

// Esperamos a que todo el contenido del HTML esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // ===== ELEMENTOS DEL DOM =====
    // Es una buena práctica declarar las constantes de los elementos que usaremos.
    const loadingScreen = document.getElementById('loading-screen');
    const startButton = document.getElementById('start-button');
    const infoPanel = document.getElementById('info-panel');
    const marker = document.getElementById('marker-corvaglia');
    const arVideo = document.getElementById('ar-video');
    const videoAsset = document.getElementById('video-corvaglia'); // El video real de los assets

    // ===== MANEJO DE LA PANTALLA DE CARGA =====
    startButton.addEventListener('click', () => {
        // Solicitamos acceso a la cámara. Es crucial para que AR.js funcione.
        // Además, en iOS el usuario DEBE interactuar con la página para que se pueda reproducir video/audio.
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                // Si el usuario da permiso, ocultamos la pantalla de carga con una transición.
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500); // Espera a que termine la transición de opacidad.

                // No es necesario llamar a enterVR() en las versiones modernas,
                // AR.js lo gestiona automáticamente con 'embedded'.
                infoPanel.textContent = "Apunta la cámara hacia el logo de Corvaglia";
            })
            .catch(error => {
                // Si el usuario niega el permiso, mostramos un error claro.
                console.error("Error al acceder a la cámara:", error);
                infoPanel.textContent = "Error: Se necesita acceso a la cámara para la experiencia AR.";
                infoPanel.style.backgroundColor = "rgba(255, 50, 50, 0.8)";
            });
    });

    // ===== CONTROL DE MARCADORES =====
    
    // Evento que se dispara cuando el marcador es detectado por la cámara.
    marker.addEventListener('markerFound', () => {
        console.log('Marcador encontrado');
        infoPanel.textContent = '¡Logo detectado!';
        arVideo.setAttribute('visible', true);
        videoAsset.play(); // Usamos el video precargado en los assets
    });

    // Evento que se dispara cuando el marcador se pierde de vista.
    marker.addEventListener('markerLost', () => {
        console.log('Marcador perdido');
        infoPanel.textContent = 'Apunta la cámara hacia el logo de Corvaglia';
        arVideo.setAttribute('visible', false);
        videoAsset.pause();
    });

});
