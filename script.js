// Send message event listener
document.getElementById("send-button").addEventListener("click", function() {
  const userInput = document.getElementById("user-input").value;
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
  loadingMessage.className = "message ai";
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
    dotCount = (dotCount + 1) % (maxDots + 1); // Cycle from 0 to maxDots
    loadingText.textContent = "Loading" + ".".repeat(dotCount);
  }, 500); // Update every 500ms

  // Simulate AI response delay
  setTimeout(() => {
    clearInterval(typingAnimation); // Stop the typing animation

    // Create AI message
    const aiMessage = document.createElement("div");
    aiMessage.className = "message ai";

    // Clone AI profile to avoid re-using the same element
    const aiProfileClone = aiProfile.cloneNode(true);
    aiMessage.appendChild(aiProfileClone);
    aiMessage.innerHTML += `<span>Hello! How can I assist you today?</span>`; // AI response

    // Append AI message to chat
    document.getElementById("messages").appendChild(aiMessage);

    // Remove loading message
    loadingMessage.remove();
  }, 2000); // 2-second delay for loading effect
});

// "Request Change" button event listener to redirect to another page
document.getElementById("request-button").addEventListener("click", function() {
  window.location.href = 'https://forms.gle/hFfY7iUq2Cexds5h6'; // Replace with the actual target page URL
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
// Send message on "Enter" key press in the input field
document.getElementById("user-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent newline in input
    document.getElementById("send-button").click(); // Trigger the send button click
  }
