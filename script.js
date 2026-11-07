// Browser entry point. The quote selection logic is also tested in src/quote.js.
const quoteList = [
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" }
];

const quoteElement = document.querySelector("#quote");
const authorElement = document.querySelector("#author");
const button = document.querySelector("#new-quote");
const statusElement = document.querySelector("#status");

button.addEventListener("click", () => {
  const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
  quoteElement.textContent = `“${quote.text}”`;
  authorElement.textContent = `— ${quote.author}`;
  statusElement.textContent = "Here is your new quote.";
});
