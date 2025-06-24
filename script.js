/**
 * CodeCraft: Script para la experiencia de Realidad Aumentada de Corvaglia.
 *
 * v5.0 - Arquitectura Definitiva con Componente Declarativo
 *
 * El problema de la pantalla en blanco en iOS se resuelve de raíz al adoptar un
 * enfoque declarativo. La lógica de AR se encapsula en un componente A-Frame
 * personalizado ('video-handler'), eliminando la interferencia con el ciclo de
 * vida de la escena. El script principal solo gestiona la UI.
 */

// 1. LÓGICA DEL COMPONENTE A-FRAME (El corazón de la solución)
AFRAME.registerComponent('video-handler', {
    init: function () {
        // Ocultamos el video al principio. 'this.el' es el <a-video>
        this.el.setAttribute('visible', false);

        // Obtenemos el marcador, que es el "padre" de este elemento
        const marker = this.el.parentElement;
        // Obtenemos el video de los assets
        const videoAsset = document.querySelector('#video-asset');
        const infoPanel = document.querySelector('#info-panel');

        marker.addEventListener('markerFound', () => {
            console.log('Marcador encontrado (lógica del componente)');
            this.el.setAttribute('visible', true);
            if (videoAsset) {
                videoAsset.play();
            }
            if (infoPanel) infoPanel.textContent = '¡Marcador detectado!';
        });

        marker.addEventListener('markerLost', () => {
            console.log('Marcador perdido (lógica del componente)');
            this.el.setAttribute('visible', false);
            if (videoAsset) {
                videoAsset.pause();
            }
            if (infoPanel) infoPanel.textContent = 'Apunta la cámara hacia la imagen';
        });
    }
});


// 2. LÓGICA DE LA INTERFAZ DE USUARIO (UI)
window.addEventListener('load', () => {
    const startButton = document.querySelector('#start-button');
    const loadingScreen = document.querySelector('#loading-screen');
    const infoPanel = document.querySelector('#info-panel');

    startButton.addEventListener('click', () => {
        // Solo pedimos permiso y ocultamos la pantalla de carga.
        // Ya no nos preocupamos por la lógica de AR aquí.
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500); // Esperamos la transición
                
                infoPanel.style.display = 'block'; // Mostramos el panel de info
            })
            .catch(error => {
                console.error("Error al acceder a la cámara:", error);
                alert("Se necesita acceso a la cámara para continuar.");
            });
    });
});
