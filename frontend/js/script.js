const container = document.getElementById('continue-btn-container');
const button = document.getElementById('continue-btn');

if (container && button) {
  const moveAway = () => {
    const minDistance = 400; // Minimum teleport distance
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    const rect = container.getBoundingClientRect();
    const currentX = rect.left + rect.width / 2;
    const currentY = rect.top + rect.height / 2;

    let nextX, nextY;

    for (let i = 0; i < 50; i++) {
        const randomX = (rect.width / 2) + Math.random() * (maxWidth - rect.width);
        const randomY = (rect.height / 2) + Math.random() * (maxHeight - rect.height);

        const distance = Math.hypot(randomX - currentX, randomY - currentY);

        if (distance >= minDistance) {
            nextX = randomX;
            nextY = randomY;
            break;
        }
    }

    // Fallback if screen is very small
    if (nextX === undefined) {
      nextX = (rect.width / 2) + Math.random() * (maxWidth - rect.width);
      nextY = (rect.height / 2) + Math.random() * (maxHeight - rect.height);
    }

    container.style.left = `${nextX}px`;
    container.style.top = `${nextY}px`;
  };

  container.addEventListener('mouseenter', moveAway);

  button.addEventListener('click', () => {
    alert("You clicked me!");
  });
}



const activeKeys = new Map();

// // Physical Keyboard Support
// window.addEventListener('keydown', (e) => {
//     const keyElement = document.querySelector(`[data-code="${e.code}"]`);
//     if (keyElement) {
//         if(['Tab', 'Space', 'AltLeft', 'AltRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
//             e.preventDefault();
//         }
//         keyElement.classList.add('active');
//         activeKeys.set(e.code, keyElement);
//     }
// });

window.addEventListener('keyup', (e) => {
    const keyElement = document.querySelector(`[data-code="${e.code}"]`);
    if (keyElement) {
        keyElement.classList.remove('active');
        activeKeys.delete(e.code);
    }
});

// Click / Touch Support
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    const activate = () => key.classList.add('active');
    const deactivate = () => key.classList.remove('active');

    key.addEventListener('mousedown', activate);
    key.addEventListener('mouseup', deactivate);
    key.addEventListener('mouseleave', deactivate);

    key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        activate();
    });
    key.addEventListener('touchend', deactivate);
});

// Window Focus Reset
window.addEventListener('blur', () => {
    activeKeys.forEach(keyElement => keyElement.classList.remove('active'));
    activeKeys.clear();
});