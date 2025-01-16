// Function to send and display messages with typing effect
function sendMessage() {
    const input = document.getElementById('messageInput');
    const output = document.getElementById('messageOutput');
    const message = input.value.trim();
    if (message === '') return;
    input.value = '';
    
    const messageElement = document.createElement('p');
    messageElement.classList.add('message');
    output.appendChild(messageElement);
    
    typeText(messageElement, message);
}

// Function to type text character by character
function typeText(element, text, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1), 50);
    }
}
