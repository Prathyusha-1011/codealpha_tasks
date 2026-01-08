const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let previousInput = "";
let operator = "";

// Function to update the display
function updateDisplay() {
    if (operator) {
        display.value = previousInput + " " + operator + " " + currentInput;
    } else {
        display.value = currentInput || "0";
    }
}

// Loop through all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        // Clear all
        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateDisplay();
            return;
        }

        // Backspace
        if (value === "←") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
            return;
        }

        // Equals
        if (value === "=") {
            if (!previousInput || !currentInput || !operator) return;

            const num1 = parseFloat(previousInput);
            const num2 = parseFloat(currentInput);
            let result;

            switch (operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num2 !== 0 ? num1 / num2 : "Error"; break;
            }

            currentInput = result.toString();
            previousInput = "";
            operator = "";
            updateDisplay();
            return;
        }

        // Operators
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === "") return;

            // If operator already selected, calculate first
            if (previousInput && operator) {
                const num1 = parseFloat(previousInput);
                const num2 = parseFloat(currentInput);
                let tempResult;

                switch (operator) {
                    case '+': tempResult = num1 + num2; break;
                    case '-': tempResult = num1 - num2; break;
                    case '*': tempResult = num1 * num2; break;
                    case '/': tempResult = num2 !== 0 ? num1 / num2 : "Error"; break;
                }

                previousInput = tempResult.toString();
                currentInput = "";
                operator = value;
                updateDisplay();
                return;
            }

            operator = value;
            previousInput = currentInput;
            currentInput = "";
            updateDisplay();
            return;
        }

        // Numbers and decimal
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
        updateDisplay();
    });
});
