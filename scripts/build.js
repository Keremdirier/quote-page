const fs = require("node:fs");
const path = require("node:path");

const requiredFiles = ["index.html", "style.css", "script.js"];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    console.error(`Build failed: missing ${file}`);
    process.exit(1);
  }
}
const html = fs.readFileSync("index.html", "utf8");
if (!html.includes("<title>Random Quote Generator</title>")) {
  console.error("Build failed: page title is missing.");
  process.exit(1);
}
console.log("Build check passed: required files and page title are present.");
