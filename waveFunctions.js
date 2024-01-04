// Function to calculate the variable frequency for the sine wave
function variableFrequency(t, f0) {
    const T0 = 100; // Time period for doubling frequency
    return f0 * Math.pow(2, t / T0);
}

// Function to calculate the sawtooth wave
function sawtoothWave(t, frequency) {
    const period = 1000 / frequency; // Calculate the period based on frequency
    return ((t % period) / period) * 2 - 1; // Generate a sawtooth waveform between -1 and 1
}

// Function to calculate the square wave
function squareWave(t, frequency) {
    const period = 1000 / frequency; // Calculate the period based on frequency
    return ((t % period) / period) < 0.5 ? 1 : -1; // Generate a square wave with values of 1 and -1
}

// Function to calculate the triangle wave
function triangleWave(t, frequency) {
    const period = 1000 / frequency; // Calculate the period based on frequency
    const normalizedT = (t % period) / period; // Normalize time to the range [0, 1]
    return normalizedT < 0.5 ? normalizedT * 4 - 1 : (1 - normalizedT) * 4 - 1; // Generate a triangle wave between -1 and 1
}