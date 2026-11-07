const quotes = [
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" }
];

function getRandomQuote(items = quotes, random = Math.random) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("A non-empty list of quotes is required.");
  }
  const index = Math.floor(random() * items.length);
  return items[index];
}

if (typeof module !== "undefined") {
  module.exports = { quotes, getRandomQuote };
}
