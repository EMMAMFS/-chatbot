function generateAIResponse(input) {
  const lowerCaseInput = input.toLowerCase();

  // Match common greetings
  if (/\b(hello|hi|hey|greetings)\b/.test(lowerCaseInput)) {
    return "Hello! 😊 Welcome to Zenix Saloon. Here’s what we can help you with.";
  }

  // Match inquiries about services
  if (/\b(service|services|options|offerings)\b/.test(lowerCaseInput)) {
    return `
      We offer a variety from:
      Haircuts: From classic styles to modern trends, we’ve got you covered!
      Shaves: Enjoy a clean, professional shave.
      Grooming Packages: Treat yourself with a complete grooming experience, including haircuts, beard trims, and scalp treatments.
    `;
  }

  // Match taper fade inquiries
  if (/\b(taper fade|fade|hairstyle)\b/.test(lowerCaseInput)) {
    return `
      You’ve come to the right place. We specialize in premium grooming services, and a shave with a taper fade is one of our most popular requests!
    `;
  }

  // Match pricing inquiries
  if (/\b(cost|price|pricing|charge|rate)\b/.test(lowerCaseInput)) {
    return `
      Our pricing for a shave and taper fade is as follows:
      Classic Shave + Traditional Taper Fade: $40
      Hot Towel Shave + Custom Taper Fade: $55
    `;
  }

  // Match booking intent
  if (/\b(book|appointment|schedule|reserve)\b/.test(lowerCaseInput)) {
    return `
      Would you like to book now? I can schedule your appointment for you, or you can book online here: [Booking Link]
    `;
  }

  // Match specific time availability (e.g., "3pm")
  if (/\b(3 ?pm|available at 3|3 o'clock)\b/.test(lowerCaseInput)) {
    return `
      Let me check availability… One moment, please! 🕒
    `;
  }

  // Confirm availability
  if (/\b(available|okay|sounds good|sure|yes)\b/.test(lowerCaseInput)) {
    return `
      ✅ Great news! We have an opening tomorrow at 3 PM. I’ve reserved the slot for you. You’ll receive a confirmation text shortly. Is there anything else I can help you with?
    `;
  }

  // Default fallback response
  return "I’m sorry, I didn’t quite catch that. Could you please provide more details?";
}
