const fs = require("fs");
const tours = JSON.parse(fs.readFileSync("scripts/tours-to-translate.json", "utf-8"));
const toursZh = JSON.parse(fs.readFileSync("src/locales/tours-zh.json", "utf-8"));

const missing = tours.filter(t => !toursZh[t.id]);
missing.forEach(t => {
  console.log("ID:", t.id);
  console.log("Name:", t.name);
  console.log("Desc:", t.description);
  console.log("Location:", t.location);
  console.log("Duration:", t.duration);
  console.log("---");
});
