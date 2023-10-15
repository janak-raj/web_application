const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.querySelector('.messages');

sendButton.addEventListener('click', function () {
    const messageText = messageInput.value;
    if (messageText) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message outgoing';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        messageContent.innerHTML = `
            <p>${messageText}</p>
            <span class="timestamp">Date: ${getFormattedDateTime()}</span>
        `;
        
        messageDiv.appendChild(messageContent);
        
        const messageIcon = document.createElement('div');
        messageIcon.className = 'message-icon';
        messageIcon.innerHTML = `<img src="src/imgs/avatars/profile.png" alt="Outgoing Icon">`;
        
        messageDiv.appendChild(messageIcon);
        
        messagesContainer.appendChild(messageDiv);
        
        messageInput.value = ''; // Clear the input field
    }
});

function getFormattedDateTime() {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
}