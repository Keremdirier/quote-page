var quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese proverb" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Small deeds done are better than great deeds planned.", author: "Peter Marshall" }
];

var quoteEl = document.getElementById("quote");
var authorEl = document.getElementById("author");
var messageEl = document.getElementById("message");
var favButton = document.getElementById("fav-quote");
var favList = document.getElementById("fav-list");
var favEmpty = document.getElementById("fav-empty");

var current = null;
var favourites = loadFavourites();

function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem("favourites")) || [];
  } catch (e) {
    return [];
  }
}

function saveFavourites() {
  try {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  } catch (e) {
    // storage not available, favourites just stay for this visit
  }
}

function isFavourite(q) {
  return favourites.some(function (f) { return f.text === q.text; });
}

function showMessage(text) {
  messageEl.textContent = text;
  setTimeout(function () { messageEl.textContent = ""; }, 2000);
}

function showQuote() {
  var next;
  do {
    next = quotes[Math.floor(Math.random() * quotes.length)];
  } while (next === current);
  current = next;
  quoteEl.textContent = current.text;
  authorEl.textContent = "- " + current.author;
  updateFavButton();
}

function updateFavButton() {
  if (isFavourite(current)) {
    favButton.textContent = "Remove from favourites";
    favButton.classList.add("saved");
  } else {
    favButton.textContent = "Save to favourites";
    favButton.classList.remove("saved");
  }
}

function copyQuote() {
  var text = '"' + current.text + '" - ' + current.author;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      function () { showMessage("Copied!"); },
      function () { showMessage("Could not copy. Select the text and copy it by hand."); }
    );
  } else {
    showMessage("Copy is not supported in this browser.");
  }
}

function toggleFavourite() {
  if (isFavourite(current)) {
    favourites = favourites.filter(function (f) { return f.text !== current.text; });
  } else {
    favourites.push(current);
  }
  saveFavourites();
  updateFavButton();
  renderFavourites();
}

function renderFavourites() {
  favList.innerHTML = "";
  favEmpty.style.display = favourites.length ? "none" : "block";
  favourites.forEach(function (f) {
    var li = document.createElement("li");
    li.textContent = '"' + f.text + '" - ' + f.author;
    var remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.addEventListener("click", function () {
      favourites = favourites.filter(function (x) { return x.text !== f.text; });
      saveFavourites();
      updateFavButton();
      renderFavourites();
    });
    li.appendChild(remove);
    favList.appendChild(li);
  });
}

document.getElementById("new-quote").addEventListener("click", showQuote);
document.getElementById("copy-quote").addEventListener("click", copyQuote);
favButton.addEventListener("click", toggleFavourite);

showQuote();
renderFavourites();
