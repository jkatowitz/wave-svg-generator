// Function to update the SVG preview based on the selected waveform and frequency
function updatePreview() {
    const width = 800;
    const height = 100;
    const waveformSelector = document.getElementById('waveformSelector');
    const selectedWaveform = waveformSelector.value;
    const f0 = parseFloat(document.getElementById('frequencySlider').value);
    const svg = document.getElementById('preview');
    const path = svg.querySelector('path');
    const pathData = [];
    const numPoints = 2000;

    for (let i = 0; i < numPoints; i++) {
        const t = (i / (numPoints - 1)) * width;
        let y;

        if (selectedWaveform === 'variableSine') {
            y = Math.sin(2 * Math.PI * variableFrequency(t, f0) * t / 1000);
            y = exponentialWave(t, A, k);
        } else if (selectedWaveform === 'sawtooth') {
            y = sawtoothWave(t, f0);
        } else if (selectedWaveform === 'square') {
            y = squareWave(t, f0);
        } else if (selectedWaveform === 'triangle') {
            y = triangleWave(t, f0);
        }

        pathData.push(`${t},${height / 2 - y * 40}`);
    }

    path.setAttribute('d', `M${pathData.join(' L')}`);
}


// Function to generate SVG and trigger download
function generateSVG() {
    updatePreview();

    const svgString = new XMLSerializer().serializeToString(document.getElementById('preview'));
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and simulate a click to trigger download
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'variable_frequency_wave.svg';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
}

// Initialize the preview and add event listeners
updatePreview();
document.getElementById('generateButton').addEventListener('click', generateSVG);
document.getElementById('frequencySlider').addEventListener('input', function () {
    document.getElementById('frequencyValue').textContent = this.value;
    updatePreview();
});