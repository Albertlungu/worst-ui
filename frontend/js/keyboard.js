document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.keyboard-container button[data-code]');
    const verificationInput = document.getElementById('verification');
    const continueBtn = document.getElementById('continue-btn');
    const deleteBtn = document.getElementById('delete-btn');

    let keyMap = {};

    function initializeRandomKeyboard() {
        keyMap = {}; 
        const originalLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const originalNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

        originalLetters.forEach((char, index) => { keyMap[char] = scrambledLetters[index]; });
        originalNumbers.forEach((num, index) => { keyMap[num] = scrambledNumbers[index]; });
    }

    initializeRandomKeyboard();

    keys.forEach(button => {
        button.addEventListener('click', () => {
            const visualKey = button.textContent.trim().toLowerCase();
            const actualValue = keyMap[visualKey] || visualKey;

            if (verificationInput) {
                verificationInput.value = (verificationInput.value || "") + actualValue;
            }
        });
    });

    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (verificationInput && verificationInput.value) {
                verificationInput.value = verificationInput.value.slice(0, -1);
            }
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', async () => {
            const code = verificationInput.value;
            if (!code) {
                alert('Please enter a verification code');
                return;
            }

            try {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ verification: code })
                });

                const data = await response.json();
                if (data.verification === 'success') {
                    window.isVerified = true;
                    alert('Verification successful!');
                } else {
                    window.isVerified = false;
                    if (verificationInput) verificationInput.value = '';
                    initializeRandomKeyboard();
                    alert('Incorrect code. Try again.');
                }
            } catch (error) {
                console.error('Verification error:', error);
                alert('Error verifying code');
            }
        });
    }
});
