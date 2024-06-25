// reconocedorDeVoz.js
let recognizer;

async function init() {
    const URL = 'https://localhost:9999/static/modelo_pre/'; // Ajusta la URL de tu modelo preentrenado
    recognizer = speechCommands.create(
        'BROWSER_FFT',
        null,
        URL + 'model.json',
        URL + 'metadata.json'
    );
    await recognizer.ensureModelLoaded();
}

function recognizeCommands(callback) {
    recognizer.listen(result => {
        const words = recognizer.wordLabels();
        const scores = result.scores;
        const highestScoreIndex = scores.indexOf(Math.max(...scores));
        const command = words[highestScoreIndex];

        if (callback) {
            callback(command, scores[highestScoreIndex]);
        }
    }, {
        probabilityThreshold: 0.80, // Ajusta el umbral de probabilidad
        includeSpectrogram: true,
        overlapFactor: 0.50 // Reduzca la superposición para mayor sensibilidad
    });
}

function stopRecognition() {
    recognizer.stopListening();
}

// En lugar de exportar, definimos las funciones en el scope global
window.init = init;
window.recognizeCommands = recognizeCommands;
window.stopRecognition = stopRecognition;
