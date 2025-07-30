// Word associations and context-based word generation
const wordAssociations = {
  // Common words
  "is": ["the", "a", "an", "this", "that", "there", "here", "what", "who", "where"],
  "the": ["first", "last", "best", "most", "only", "same", "other", "new", "old", "right"],
  "and": ["or", "but", "so", "yet", "while", "though", "because", "if", "when", "then"],

  // Food and cooking
  "apple": ["pie", "juice", "sauce", "cider", "crisp", "orchard", "red", "green", "sweet"],
  "banana": ["bread", "split", "cream", "yellow", "ripe", "peel", "smoothie", "chips"],
  "bread": ["butter", "toast", "sandwich", "crust", "fresh", "bake", "wheat", "rye"],
  "milk": ["cereal", "cheese", "cream", "butter", "yogurt", "shake", "cold", "white"],
  "coffee": ["cup", "bean", "brew", "morning", "caffeine", "espresso", "latte", "dark"],
  
  // Nature and weather
  "sun": ["shine", "bright", "warm", "light", "day", "summer", "beach", "tan"],
  "rain": ["water", "storm", "cloud", "wet", "umbrella", "puddle", "drops", "thunder"],
  "tree": ["leaf", "branch", "root", "forest", "green", "tall", "shade", "wood"],
  "flower": ["bloom", "petal", "garden", "rose", "beautiful", "spring", "color", "scent"],
  
  // Technology and modern life
  "computer": ["screen", "keyboard", "mouse", "internet", "software", "data", "work", "game"],
  "phone": ["call", "text", "app", "screen", "mobile", "smart", "battery", "signal"],
  "car": ["drive", "road", "wheel", "engine", "gas", "speed", "travel", "park"],
  
  // Emotions and feelings
  "happy": ["smile", "joy", "laugh", "fun", "good", "positive", "cheerful", "bright"],
  "sad": ["tear", "cry", "blue", "down", "lonely", "hurt", "miss", "pain"],
  "love": ["heart", "romance", "kiss", "hug", "care", "sweet", "warm", "forever"],
  
  // Colors
  "red": ["fire", "hot", "blood", "rose", "apple", "stop", "danger", "passion"],
  "blue": ["sky", "ocean", "water", "cold", "calm", "peace", "deep", "cool"],
  "green": ["grass", "nature", "growth", "fresh", "leaf", "plant", "life", "earth"],
  
  // Common objects
  "book": ["read", "page", "story", "learn", "knowledge", "library", "author", "chapter"],
  "door": ["open", "close", "house", "room", "enter", "exit", "lock", "key"],
  "window": ["view", "glass", "open", "light", "outside", "inside", "frame", "curtain"],
  
  // Actions
  "run": ["fast", "speed", "race", "exercise", "move", "quick", "athlete", "track"],
  "walk": ["slow", "step", "path", "journey", "stroll", "pace", "legs", "distance"],
  "sleep": ["bed", "dream", "rest", "night", "tired", "pillow", "quiet", "dark"],
  
  // Time
  "morning": ["breakfast", "sunrise", "early", "fresh", "start", "day", "wake", "dawn"],
  "night": ["dark", "sleep", "moon", "star", "dream", "quiet", "late", "evening"],
  "today": ["now", "present", "current", "moment", "time", "day", "live", "here"],
  
  // Places
  "home": ["house", "family", "comfort", "safe", "warm", "room", "belong", "live"],
  "school": ["learn", "student", "teacher", "class", "education", "knowledge", "study"],
  "work": ["job", "office", "career", "business", "professional", "earn", "skill"],
  
  // Animals
  "dog": ["pet", "loyal", "friend", "bark", "tail", "play", "companion", "love"],
  "cat": ["pet", "purr", "meow", "independent", "graceful", "feline", "soft", "curious"],
  "bird": ["fly", "wing", "sky", "song", "feather", "nest", "freedom", "air"],
  
  // Body parts
  "hand": ["finger", "touch", "hold", "grasp", "write", "wave", "clap", "help"],
  "eye": ["see", "look", "vision", "watch", "observe", "sight", "view", "gaze"],
  "heart": ["beat", "love", "feel", "emotion", "pulse", "life", "care", "warm"],
  
  // Numbers and quantities
  "one": ["single", "first", "alone", "unique", "individual", "start", "begin"],
  "two": ["pair", "couple", "double", "together", "both", "second", "match"],
  "many": ["lots", "multiple", "several", "crowd", "group", "bunch", "numerous"],
  
  // Abstract concepts
  "time": ["clock", "hour", "minute", "moment", "past", "future", "now", "duration"],
  "space": ["room", "area", "place", "distance", "empty", "vast", "universe", "cosmos"],
  "light": ["bright", "shine", "illuminate", "glow", "beam", "ray", "sun", "lamp"],
  
  // Default fallback words for any input
  "default": ["good", "great", "nice", "wonderful", "amazing", "excellent", "perfect", "beautiful", "fantastic", "awesome", "lovely", "delightful", "pleasant", "marvelous", "splendid", "superb", "however", "but", "although", "therefore", "moreover", "furthermore", "nevertheless", "meanwhile", "consequently", "additionally"]
};

// Function to get contextually relevant words based on the last word
export function get_next_word(lastWord) {
  if (!lastWord || typeof lastWord !== 'string') {
    return wordAssociations.default;
  }
  
  const normalizedWord = lastWord.toLowerCase().trim();
  
  // Check for exact matches first
  if (wordAssociations[normalizedWord]) {
    return wordAssociations[normalizedWord];
  }
  
  // Check for partial matches (words that contain the last word or vice versa)
  const partialMatches = [];
  for (const [key, values] of Object.entries(wordAssociations)) {
    if (key.includes(normalizedWord) || normalizedWord.includes(key)) {
      partialMatches.push(...values);
    }
  }
  
  if (partialMatches.length > 0) {
    // Return unique values, limit to 8 suggestions
    return [...new Set(partialMatches)].slice(0, 8);
  }
  
  // If no matches found, return random subset of default words
  const defaultWords = wordAssociations.default;
  const shuffled = [...defaultWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8);
}

// Function to get random words from the association pool
export function get_random_words(count = 10) {
  const allWords = Object.keys(wordAssociations).filter(word => word !== 'default');
  const randomWords = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    randomWords.push(allWords[randomIndex]);
  }
  
  return randomWords;
} 