// Send message event listener
document.getElementById("send-button").addEventListener("click", function() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return; // Prevent sending empty messages

  // Create a message container for the user
  const userMessage = document.createElement("div");
  userMessage.className = "message user";

  // Create user profile element
  const userProfile = document.createElement("div");
  userProfile.className = "profile user-profile";
  userProfile.style.backgroundImage = "url('images/user-profile.jpg')"; // Path to the user's profile picture
  userProfile.style.backgroundSize = "cover";
  userProfile.style.backgroundPosition = "center";

  // Add user message text
  userMessage.innerHTML = `<span>${userInput}</span>`;
  
  // Append profile to message
  userMessage.appendChild(userProfile);

  // Add user message to chat
  document.getElementById("messages").appendChild(userMessage);

  // Clear input field
  document.getElementById("user-input").value = "";

  // Display loading message for AI with animated dots
  const loadingMessage = document.createElement("div");
  loadingMessage.className = "message ai loading-dots"; // Add loading-dots class for animation
  loadingMessage.id = "loading-message";

  // Add AI profile
  const aiProfile = document.createElement("div");
  aiProfile.className = "profile ai-profile";
  aiProfile.style.backgroundImage = "url('images/ai-profile.jpg')"; // Path to AI profile picture
  aiProfile.style.backgroundSize = "cover";
  aiProfile.style.backgroundPosition = "center";

  loadingMessage.appendChild(aiProfile); // Append AI profile to loading message
  const loadingText = document.createElement("span");
  loadingText.textContent = "Loading"; // Start with base text
  loadingMessage.appendChild(loadingText);
  document.getElementById("messages").appendChild(loadingMessage);

  // Animate dots in the loading message
  let dotCount = 0;
  const maxDots = 3;
  const typingAnimation = setInterval(() => {
    if (document.getElementById("loading-message")) {
      dotCount = (dotCount + 1) % (maxDots + 1); // Cycle from 0 to maxDots
      loadingText.textContent = "Loading" + ".".repeat(dotCount);
    } else {
      clearInterval(typingAnimation);
    }
  }, 500); // Update every 500ms

  // AI responses
  const aiResponses = [
    "Hello! 😊 Welcome to Zenix Saloon. Here’s what we can help you with:",
    "We offer variety from:\nHaircuts: From classic styles to modern trends, we’ve got you covered!\nShaves: Enjoy a clean, professional shave.\nGrooming Packages: Treat yourself with a complete grooming experience, including haircuts, beard trims, and scalp treatments.",
    "You’ve come to the right place. We specialize in premium grooming services, and a shave with a taper fade is one of our most popular requests!",
    "Here’s what we offer in Shave Options:\nClassic Shave: A clean, professional shave using high-quality razors and shaving products.\nHot Towel Shave: Relax and enjoy a hot towel treatment for the smoothest shave.",
    "Taper Fade Options:\nTraditional Taper Fade: A sharp, clean cut with seamless blending.\nCustom Taper Fade: Let us personalize the fade to match your style.",
    "Our pricing for a shave and taper fade is as follows:\nClassic Shave + Traditional Taper Fade: $40\nHot Towel Shave + Custom Taper Fade: $55",
    "Would you like to book now? I can schedule your appointment for you, or you can book online here:\nLet me check availability… One moment, please! 🕒",
    "✅ Great news! We have an opening tomorrow at 3 PM. I’ve reserved the slot for you. You’ll receive a confirmation text shortly. Is there anything else I can help you with?",
    "Hi Peter, this is a reminder about your appointment at Zenix Saloon. See you soon! Let us know if you need to reschedule."
  ];

  // Function to send AI responses sequentially
  let messageIndex = 0;

  function replaceLoadingWithAIMessage() {
    if (messageIndex < aiResponses.length) {
      // Clear the loading animation
      clearInterval(typingAnimation);
      document.getElementById("loading-message").remove();

      // Create AI message container
      const aiMessage = document.createElement("div");
      aiMessage.className = "message ai";

      // Clone AI profile to avoid re-using the same element
      const aiProfileClone = aiProfile.cloneNode(true);
      aiMessage.appendChild(aiProfileClone);
      aiMessage.innerHTML += `<span>${aiResponses[messageIndex]}</span>`; // AI response

      // Append AI message to chat
      document.getElementById("messages").appendChild(aiMessage);

      messageIndex++;
    }
  }

  // Simulate AI response delay
  setTimeout(() => {
    replaceLoadingWithAIMessage();
  }, 2000); // Adjust delay time for AI response

  // Re-enable the send button after the response
  setTimeout(() => {
    document.getElementById("send-button").disabled = false;
  }, 2000);
});

// Refresh button event listener to clear chat messages
document.getElementById("refresh-button").addEventListener("click", function() {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = ""; // Clear all chat messages

  // Optional: Display a message indicating the chat has been cleared
  const clearedMessage = document.createElement("div");
  clearedMessage.className = "message system";
  clearedMessage.innerHTML = `<span>Chat cleared. Start a new conversation!</span>`;
  messagesContainer.appendChild(clearedMessage);
});
