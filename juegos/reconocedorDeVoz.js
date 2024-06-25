// voiceRecognition.js
import * as speechCommands from '@tensorflow-models/speech-commands';

let recognizer;

async function init() {
    const URL = 'http://localhost:8080/model/modelo_pre/';
    recognizer = speechCommands.create(
        'BROWSER_FFT',
        null,
        URL + 'model.json',
        URL + 'metadata.json'
    );

    await recognizer.ensureModelLoaded();
    console.log('Modelo cargado correctamente');
}

function recognizeCommands(callback) {
    recognizer.listen(result => {
        const words = recognizer.wordLabels();
        const scores = result.scores;
        const highestScoreIndex = scores.indexOf(Math.max(...scores));
        const command = words[highestScoreIndex];

        if (scores[highestScoreIndex] > 0.80 && scores[highestScoreIndex] < 1.0) {
            callback(command, scores[highestScoreIndex]);
        } else {
            callback('background noise', scores[highestScoreIndex]);
        }
    }, {
        probabilityThreshold: 0.80,
        overlapFactor: 0.75
    });
}

function stopRecognition() {
    recognizer.stopListening();
}

export { init, recognizeCommands, stopRecognition };
