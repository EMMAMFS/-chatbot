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

  // AI responses in sequence
  const aiResponses = {
    default: [
      "Hello! 😊 Welcome to Zenix Saloon. Here’s what we can help you with:",
      "We offer a variety from:\nHaircuts: From classic styles to modern trends, we’ve got you covered!\nShaves: Enjoy a clean, professional shave.\nGrooming Packages: Treat yourself with a complete grooming experience, including haircuts, beard trims, and scalp treatments.",
      "You’ve come to the right place. We specialize in premium grooming services, and a shave with a taper fade is one of our most popular requests!",
      "Here’s what we offer for Shave Options:\nClassic Shave: A clean, professional shave using high-quality razors and shaving products.\nHot Towel Shave: Relax and enjoy a hot towel treatment for the smoothest shave.\nTaper Fade Options:\nTraditional Taper Fade: A sharp, clean cut with seamless blending.\nCustom Taper Fade: Let us personalize the fade to match your style.",
      "Our pricing for a shave and taper fade is as follows:\nClassic Shave + Traditional Taper Fade: $40\nHot Towel Shave + Custom Taper Fade: $55",
      "Would you like to book now? I can schedule your appointment for you, or you can book online here:\n[Booking Link]",
      "Let me check availability… One moment, please! 🕒",
      "✅ Great news! We have an opening tomorrow at 3 PM. I’ve reserved the slot for you. You’ll receive a confirmation text shortly. Is there anything else I can help you with?",
      "Hi [Customer Name], this is a reminder about your appointment at Zenix Saloon. See you soon! Let us know if you need to reschedule."
    ],
    bookingInquiry: [
      "I can help with booking an appointment! What date and time would work best for you?",
      "Would you like to book a specific service or explore more options?"
    ],
    pricingInquiry: [
      "Our pricing for a shave and taper fade is:\nClassic Shave + Traditional Taper Fade: $40\nHot Towel Shave + Custom Taper Fade: $55. Let me know if you need any more details!"
    ],
    serviceInquiry: [
      "We offer a variety of services, including haircuts, shaves, and grooming packages. Is there a specific service you're interested in?"
    ]
  };

  let messageIndex = 0;

  // Function to handle the AI's response after each user input
  function sendNextAIMessage(responseType = "default") {
    const responses = aiResponses[responseType] || aiResponses.default;

    if (messageIndex < responses.length) {
      // Clear loading animation
      clearInterval(typingAnimation);
      const loadingMessage = document.getElementById("loading-message");
      if (loadingMessage) loadingMessage.remove();

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
      aiMessage.innerHTML += `<span>${responses[messageIndex]}</span>`;

      // Append AI message to chat
      document.getElementById("messages").appendChild(aiMessage);

      // Scroll to the latest message
      const messagesContainer = document.getElementById("messages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Move to the next message after a user reply
      messageIndex++;
    }
  }

  // Start showing the first AI response after the user input
  if (messageIndex === 0) {
    displayLoadingDots();
    setTimeout(() => {
      const responseType = analyzeUserInput(userInput);
      sendNextAIMessage(responseType);
    }, 2000);
  }

  // Analyze user input to decide which type of response to send
  function analyzeUserInput(input) {
    const lowerCaseInput = input.toLowerCase();

    // If the input contains "book", "appointment", or similar, go to booking flow
    if (lowerCaseInput.includes("book") || lowerCaseInput.includes("appointment")) {
      return "bookingInquiry"; // Trigger booking response
    } else if (lowerCaseInput.includes("price") || lowerCaseInput.includes("cost")) {
      return "pricingInquiry"; // Trigger pricing response
    } else if (lowerCaseInput.includes("service")) {
      return "serviceInquiry"; // Trigger service inquiry response
    } else {
      return "default"; // Default response if no specific keywords
    }
  }

  // Trigger AI response based on user's input
  const responseType = analyzeUserInput(userInput);
  sendNextAIMessage(responseType);

  // Listen for user reply (for the conversational flow)
  document.getElementById("user-input").addEventListener("input", function () {
    if (document.getElementById("user-input").value.trim()) {
      sendNextAIMessage(responseType);
    }
  });
});
