
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
