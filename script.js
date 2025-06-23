document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const loadingScreen = document.getElementById('loading-screen');
    const arVideo = document.getElementById('ar-video');

    // Manejar el inicio de la experiencia
    startButton.addEventListener('click', function() {
        // Verificar permisos de cámara
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Ocultar pantalla de carga
                loadingScreen.style.display = 'none';
                
                // Iniciar video AR cuando se detecte el marcador
                document.querySelector('a-marker').addEventListener('markerFound', function() {
                    arVideo.setAttribute('visible', 'true');
                    document.getElementById('video-corvaglia').play();
                });
                
                // Pausar video cuando se pierde el marcador
                document.querySelector('a-marker').addEventListener('markerLost', function() {
                    arVideo.setAttribute('visible', 'false');
                    document.getElementById('video-corvaglia').pause();
                });
            })
            .catch(function(error) {
                alert('Error al acceder a la cámara: ' + error.message);
            });
    });
});
