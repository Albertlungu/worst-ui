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
