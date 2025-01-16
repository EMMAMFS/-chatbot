// Select elements from the DOM
const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");
const loadingIndicator = document.getElementById("loading");
const refreshButton = document.getElementById("refresh-button");
const requestButton = document.getElementById("request-button");

// Function to generate AI response
function generateAIResponse(input) {
  const lowerCaseInput = input.toLowerCase();

  if (/\b(hello|hi|hey|greetings)\b/.test(lowerCaseInput)) {
    return "Hello! 😊 Welcome to Zenix Saloon. Here’s what we can help you with.";
  }

  if (/\b(service|services|options|offerings)\b/.test(lowerCaseInput)) {
    return `
      We offer a variety from:
      - Haircuts: From classic styles to modern trends, we’ve got you covered!
      - Shaves: Enjoy a clean, professional shave.
      - Grooming Packages: Treat yourself with a complete grooming experience, including haircuts, beard trims, and scalp treatments.
    `;
  }

  if (/\b(taper fade|fade|hairstyle)\b/.test(lowerCaseInput)) {
    return "You’ve come to the right place. We specialize in premium grooming services, and a shave with a taper fade is one of our most popular requests!";
  }

  if (/\b(cost|price|pricing|charge|rate)\b/.test(lowerCaseInput)) {
    return `
      Our pricing for a shave and taper fade is as follows:
      - Classic Shave + Traditional Taper Fade: $40
      - Hot Towel Shave + Custom Taper Fade: $55
    `;
  }

  if (/\b(book|appointment|schedule|reserve)\b/.test(lowerCaseInput)) {
    return "Would you like to book now? I can schedule your appointment for you, or you can book online here: [Booking Link]";
  }

  if (/\b(3 ?pm|available at 3|3 o'clock)\b/.test(lowerCaseInput)) {
    return "Let me check availability… One moment, please! 🕒";
  }

  if (/\b(available|okay|sounds good|sure|yes)\b/.test(lowerCaseInput)) {
    return "✅ Great news! We have an opening tomorrow at 3 PM. I’ve reserved the slot for you. You’ll receive a confirmation text shortly. Is there anything else I can help you with?";
  }

  return "I’m sorry, I didn’t quite catch that. Could you please provide more details?";
}

// Function to add a message to the chat
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "message user" : "message bot";
  messageDiv.textContent = text;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
}

// Event listener for the send button
sendButton.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    userInput.value = ""; // Clear input

    // Show loading indicator
    loadingIndicator.style.display = "block";

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      addMessage(aiResponse, "bot");
      loadingIndicator.style.display = "none"; // Hide loading indicator
    }, 1000); // Simulate delay
  }
});

// Optional: Refresh button functionality
refreshButton.addEventListener("click", () => {
  messages.innerHTML = ""; // Clear all messages
});

// Optional: Request button functionality
requestButton.addEventListener("click", () => {
  addMessage("Request for change submitted! 🚀", "bot");
});
