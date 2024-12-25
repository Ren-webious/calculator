const calculateScreen = document.querySelector('.calculate');
const resultScreen = document.querySelector('.result');
const clearButton = document.getElementById('clear-btn');
const deleteButton = document.getElementById('del-btn');
const equalsButton = document.getElementById('equals-btn');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const operators = ['%', '/', '*', '-', '+'];
let calculateValue = '';

// Function to add value to the calculation screen
function addCalculateScreen(value) {
    // Append the value to the calculation string
    calculateValue += value;

    // Update the calculation screen display with proper symbols for division and multiplication
    let displayValue = calculateValue
        .replace(/\//g, '÷')  // Replace all '/' with '÷'
        .replace(/\*/g, '×'); // Replace all '*' with '×'

    calculateScreen.textContent = displayValue; // Display the formatted string
}

// Handle number button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const numValue = button.getAttribute('data-number');
        if (calculateValue === '' && numValue === '.') return;
        if (calculateValue.at(-1) === '.' && numValue === '.') return;
        addCalculateScreen(numValue);
    });
});

// Handle operation button clicks
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operationValue = button.getAttribute('data-operation');
        if (calculateValue === '') return;
        if (operators.includes(calculateValue.at(-1))) return;

        // If the result screen is not empty and not 'Error', allow further operations on the result
        if (resultScreen.textContent !== '' && resultScreen.textContent !== 'Error') {
            // Append the new operation to the result if we are continuing the calculation
            calculateValue = resultScreen.textContent;
            resultScreen.textContent = '';
        }

        addCalculateScreen(operationValue);
    });
});

// Clear the calculation
clearButton.addEventListener('click', () => {
    calculateValue = '';
    calculateScreen.textContent = '';
    resultScreen.textContent = '';
});

// Delete the last character
deleteButton.addEventListener('click', () => {
    calculateValue = calculateValue.slice(0, -1);
    calculateScreen.textContent = calculateValue;
    resultScreen.textContent = '';
});

// Calculate the result
equalsButton.addEventListener('click', () => {
    try {
        // Replace ÷ and × with / and * for eval function
        const safeValue = calculateValue
            .replace(/÷/g, '/')
            .replace(/×/g, '*');
        const result = eval(safeValue);

        // Show the result in the upper screen only
        calculateScreen.textContent = result;  // Update the calculation screen to the result

        // Clear the result screen (lower) after showing the result
        resultScreen.textContent = '';

        // After showing the result, allow further operations to continue from the result
        calculateValue = result.toString();  // Update with the result
    } catch (e) {
        resultScreen.textContent = 'Error';
    }
});