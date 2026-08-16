#!/usr/bin/env node
/**
 * Baut aus src/vorlage.html die fertigen HTML-Dateien.
 * Damit bleibt die Rechenlogik in allen Varianten garantiert identisch.
 *
 *   node build.js
 */
const fs = require("fs");
const path = require("path");

const VARIANTEN = [
  {
    datei: "rechnungen-alle.html",
    id: "alle",
    titel: "Gemeinsame Kasse – alle fünf",
    personen: ["Sina", "Alex", "Chiara", "Julius", "Marian"],
    akzent: "#2f6f4f",
    akzentWeich: "#e3f5ea"
  },
  {
    datei: "abrechnung-julius-marian-chiara.html",
    id: "jmc",
    titel: "Abrechnung – Julius, Marian, Chiara",
    personen: ["Julius", "Marian", "Chiara"],
    akzent: "#3a5a9b",
    akzentWeich: "#e6ecf8"
  }
];

const vorlage = fs.readFileSync(path.join(__dirname, "src", "vorlage.html"), "utf8");

for (const v of VARIANTEN) {
  const html = vorlage
    .replace(/\{\{TITEL\}\}/g, v.titel)
    .replace(/\{\{ID\}\}/g, v.id)
    .replace(/\{\{PERSONEN_JSON\}\}/g, JSON.stringify(v.personen))
    .replace(/\{\{AKZENT_WEICH\}\}/g, v.akzentWeich)
    .replace(/\{\{AKZENT\}\}/g, v.akzent);

  const rest = html.match(/\{\{[A-Z_]+\}\}/g);
  if (rest) throw new Error("Unersetzte Platzhalter in " + v.datei + ": " + [...new Set(rest)].join(", "));

  fs.writeFileSync(path.join(__dirname, v.datei), html);
  console.log("geschrieben:", v.datei, "(" + (html.length / 1024).toFixed(0) + " KB, " + v.personen.join(", ") + ")");
}
