// js/keyboard.js

document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.keyboard-container button[data-code]');
    const verificationInput = document.getElementById('verification');
    const continueBtn = document.getElementById('continue-btn');
    const deleteBtn = document.getElementById('delete-btn');

    // Store the current run's mappings
    let keyMap = {};

    // 1. The core function that scrambles everything and sets up a fresh run
    function initializeRandomKeyboard() {
        keyMap = {}; // Clear previous run mapping

        const originalLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const originalNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        // Fisher-Yates Shuffle Algorithm to guarantee a brand-new order every run
        function shuffle(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        const scrambledLetters = shuffle(originalLetters);
        const scrambledNumbers = shuffle(originalNumbers);

        // Map old keys to new random keys for this specific run
        originalLetters.forEach((char, index) => {
            keyMap[char] = scrambledLetters[index];
        });

        originalNumbers.forEach((num, index) => {
            keyMap[num] = scrambledNumbers[index];
        });

        
    }

    // 2. Run the scrambling logic immediately when the page loads
    initializeRandomKeyboard();

    // 3. Attach the click events to your keys
    keys.forEach(button => {
        button.addEventListener('click', () => {
            const visualKey = button.textContent.trim().toLowerCase();
            
            // Look up what this key translates to in THIS run
            const actualValue = keyMap[visualKey] || visualKey;

            

            if (verificationInput) {
                // Append the mapped character into the verification input's value
                verificationInput.value = (verificationInput.value || "") + actualValue;
            }
        });
    });
    // Handle the static Delete button
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (verificationInput && verificationInput.value) {
                verificationInput.value = verificationInput.value.slice(0, -1);
            }
        });
    }

    // 4. Change the "Continue" button to act as a "Rerun / Next Level" trigger
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            // Clear the typed text in the verification input
            if (verificationInput) verificationInput.value = '';
            
            // RE-RUN the scrambling logic to get completely different values
            initializeRandomKeyboard();
        });
    }
});