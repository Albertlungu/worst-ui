// js/keyboard.js

document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.keyboard-container button[data-code]');
    const display = document.getElementById('keyboard-display');
    const continueBtn = document.getElementById('continue-btn');

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

        // Print the new cheat sheet to the console so you can see it changed
        console.log("%c New Run Initialized! Here is your layout mapping:", "color: red; font-weight: bold;");
        console.log(keyMap);
    }

    // 2. Run the scrambling logic immediately when the page loads
    initializeRandomKeyboard();

    // 3. Attach the click events to your keys
    keys.forEach(button => {
        button.addEventListener('click', () => {
            const visualKey = button.textContent.trim().toLowerCase();
            
            // Look up what this key translates to in THIS run
            const actualValue = keyMap[visualKey] || visualKey;

            console.log(`[This Run] Pressed: ${visualKey.toUpperCase()} -> Typed: ${actualValue.toUpperCase()}`);

            if (display) {
                display.textContent += actualValue;
            }
        });
    });

    // 4. Change the "Continue" button to act as a "Rerun / Next Level" trigger
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            alert(`Submission saved: "${display ? display.textContent : ''}"\n\nGenerating a completely different layout for the next run!`);
            
            // Clear the typed text
            if (display) display.textContent = '';
            
            // RE-RUN the scrambling logic to get completely different values
            initializeRandomKeyboard();
        });
    }
});