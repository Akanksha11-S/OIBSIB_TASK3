// Get DOM elements
const temperatureInput = document.getElementById('temperature-input');
const unitSelect = document.getElementById('unit-select');
const convertBtn = document.getElementById('convert-btn');
const errorMessage = document.getElementById('error-message');
const resultsSection = document.getElementById('results-section');
const celsiusResult = document.getElementById('celsius-result');
const fahrenheitResult = document.getElementById('fahrenheit-result');
const kelvinResult = document.getElementById('kelvin-result');

// Conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return ((fahrenheit - 32) * 5/9) + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5) + 32;
}

// Validate input
function validateInput(value) {
    if (value.trim() === '') {
        return { valid: false, message: 'Please enter a temperature value' };
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    return { valid: true, value: numValue };
}

// Format number to 2 decimal places
function formatNumber(num) {
    return num.toFixed(2);
}

// Perform conversion
function convertTemperature() {
    // Clear previous error
    errorMessage.textContent = '';
    
    // Validate input
    const validation = validateInput(temperatureInput.value);
    
    if (!validation.valid) {
        errorMessage.textContent = validation.message;
        resultsSection.classList.remove('show');
        return;
    }
    
    const inputTemp = validation.value;
    const selectedUnit = unitSelect.value;
    
    let celsius, fahrenheit, kelvin;
    
    // Convert based on selected unit
    switch(selectedUnit) {
        case 'celsius':
            celsius = inputTemp;
            fahrenheit = celsiusToFahrenheit(inputTemp);
            kelvin = celsiusToKelvin(inputTemp);
            break;
            
        case 'fahrenheit':
            celsius = fahrenheitToCelsius(inputTemp);
            fahrenheit = inputTemp;
            kelvin = fahrenheitToKelvin(inputTemp);
            break;
            
        case 'kelvin':
            celsius = kelvinToCelsius(inputTemp);
            fahrenheit = kelvinToFahrenheit(inputTemp);
            kelvin = inputTemp;
            break;
            
        default:
            celsius = inputTemp;
            fahrenheit = celsiusToFahrenheit(inputTemp);
            kelvin = celsiusToKelvin(inputTemp);
    }
    
    // Display results
    celsiusResult.textContent = formatNumber(celsius);
    fahrenheitResult.textContent = formatNumber(fahrenheit);
    kelvinResult.textContent = formatNumber(kelvin);
    
    // Show results section
    resultsSection.classList.add('show');
}

// Event listeners
convertBtn.addEventListener('click', convertTemperature);

// Allow Enter key to trigger conversion
temperatureInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertTemperature();
    }
});

// Clear error message when user starts typing
temperatureInput.addEventListener('input', function() {
    if (errorMessage.textContent) {
        errorMessage.textContent = '';
    }
});
