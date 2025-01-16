// Send message event listener
document.getElementById("send-button").addEventListener("click", function () {
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
  let typingAnimation; // Declare this as a local variable

  function displayLoadingDots() {
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message ai loading-dots";
    loadingMessage.id = "loading-message";

    // Add AI profile
    const aiProfile = document.createElement("div");
    aiProfile.className = "profile ai-profile";
    aiProfile.style.backgroundImage = "url('images/ai-profile.jpg')";
    aiProfile.style.backgroundSize = "cover";
    aiProfile.style.backgroundPosition = "center";

    loadingMessage.appendChild(aiProfile);

    const loadingText = document.createElement("span");
    loadingText.textContent = "Loading";
    loadingMessage.appendChild(loadingText);
    document.getElementById("messages").appendChild(loadingMessage);

    let dotCount = 0;
    const maxDots = 3;
    typingAnimation = setInterval(() => {
      if (document.getElementById("loading-message")) {
        dotCount = (dotCount + 1) % (maxDots + 1);
        loadingText.textContent = "Loading" + ".".repeat(dotCount);
      } else {
        clearInterval(typingAnimation);
      }
    }, 500);
  }

  // AI responses
  const aiResponses = [
    "Hello! 😊 Welcome to Zenix Saloon. Here’s what we can help you with:",
    "We offer variety from:\nHaircuts: From classic styles to modern trends, we’ve got you covered!\nShaves: Enjoy a clean, professional shave.\nGrooming Packages: Treat yourself with a complete grooming experience, including haircuts, beard trims, and scalp treatments.",
    "Our pricing for a shave and taper fade is as follows:\nClassic Shave + Traditional Taper Fade: $40\nHot Towel Shave + Custom Taper Fade: $55",
    "✅ Great news! We have an opening tomorrow at 3 PM. I’ve reserved the slot for you. You’ll receive a confirmation text shortly. Is there anything else I can help you with?",
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

      // Add AI profile
      const aiProfileClone = document.createElement("div");
      aiProfileClone.className = "profile ai-profile";
      aiProfileClone.style.backgroundImage = "url('images/ai-profile.jpg')";
      aiProfileClone.style.backgroundSize = "cover";
      aiProfileClone.style.backgroundPosition = "center";
      aiMessage.appendChild(aiProfileClone);

      // Add AI message text
      aiMessage.innerHTML += `<span>${aiResponses[messageIndex]}</span>`;

      // Append AI message to chat
      document.getElementById("messages").appendChild(aiMessage);

      // Scroll to the latest message
      const messagesContainer = document.getElementById("messages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Move to the next message
      messageIndex++;

      // Queue the next message if there are more
      if (messageIndex < aiResponses.length) {
        setTimeout(() => {
          displayLoadingDots(); // Re-display loading dots for the next message
          setTimeout(() => {
            replaceLoadingWithAIMessage(); // Show the next AI response
          }, 2000);
        }, 1000);
      }
    }
  }

  // Start showing the first AI response
  setTimeout(() => {
    displayLoadingDots();
    setTimeout(() => {
      replaceLoadingWithAIMessage();
    }, 2000);
  }, 2000);
});
