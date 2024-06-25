import React, { useEffect } from 'react';

const Snake = () => {
    useEffect(() => {
        const iframe = document.getElementById('snake-game');

        // Solicitar permiso para el micrófono
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                console.log('Permiso de micrófono otorgado');
                iframe.contentWindow.postMessage({ type: 'micPermission', granted: true }, '*');
            })
            .catch(error => {
                console.error('Error al obtener permiso del micrófono:', error);
                iframe.contentWindow.postMessage({ type: 'micPermission', granted: false }, '*');
            });
    }, []);

    return (
        <div>
            <iframe
                id="snake-game"
                src="https://localhost:9999/static/snake.js/index.html"
                title="Snake Game"
                width="600"
                height="500"
                allow='microphone'
            ></iframe>
        </div>
    );
}

export default Snake;
