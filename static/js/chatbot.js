// AI Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('chatbot');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendMessageButton = document.getElementById('send-message');
    const voiceInputButton = document.getElementById('voice-input');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbot.classList.toggle('active');
        
        // Scroll to bottom of messages
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Focus input
        if (chatbot.classList.contains('active')) {
            userMessageInput.focus();
        }
    });
    
    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbot.classList.remove('active');
    });
    
    // Send message on button click
    sendMessageButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userMessageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Voice input (if browser supports it)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        voiceInputButton.addEventListener('click', function() {
            recognition.start();
            voiceInputButton.classList.add('listening');
            voiceInputButton.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        });
        
        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            userMessageInput.value = speechResult;
            voiceInputButton.classList.remove('listening');
            voiceInputButton.innerHTML = '<i class="fas fa-microphone"></i>';
            
            // Send the message
            sendMessage();
        };
        
        recognition.onerror = function() {
            voiceInputButton.classList.remove('listening');
            voiceInputButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onend = function() {
            voiceInputButton.classList.remove('listening');
            voiceInputButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
    } else {
        voiceInputButton.style.display = 'none';
    }
    
    function sendMessage() {
        const message = userMessageInput.value.trim();
        
        if (message === '') {
            return;
        }
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        userMessageInput.value = '';
        
        // Show typing indicator
        addTypingIndicator();
        
        // Call API to get response
        fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            removeTypingIndicator();
            
            if (data.success) {
                // Add bot response
                addMessage(data.response, 'bot');
            } else {
                // Add error message
                addMessage("I'm sorry, I encountered an error. Please try again later.", 'bot');
                console.error('Error:', data.error);
            }
        })
        .catch(error => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add error message
            addMessage("I'm sorry, I encountered an error. Please try again later.", 'bot');
            console.error('Error:', error);
        });
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = text;
        
        messageContent.appendChild(messageParagraph);
        messageDiv.appendChild(messageContent);
        
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        
        const typingDots = document.createElement('div');
        typingDots.className = 'typing-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDots.appendChild(dot);
        }
        
        typingContent.appendChild(typingDots);
        typingDiv.appendChild(typingContent);
        
        chatbotMessages.appendChild(typingDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
});
