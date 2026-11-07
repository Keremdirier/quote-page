const test = require("node:test");
const assert = require("node:assert/strict");
const { quotes, getRandomQuote } = require("../src/quote.js");

test("the quote collection contains at least four entries", () => {
  assert.ok(quotes.length >= 100);
});

test("selects the first quote when random value is zero", () => {
  assert.equal(getRandomQuote(quotes, () => 0), quotes[0]);
});

test("selects the last quote when random value is just below one", () => {
  assert.equal(getRandomQuote(quotes, () => 0.999999), quotes[quotes.length - 1]);
});

test("rejects an empty quote collection", () => {
  assert.throws(() => getRandomQuote([], () => 0), /non-empty list/);
});
