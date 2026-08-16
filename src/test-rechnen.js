#!/usr/bin/env node
/**
 * Prüft die Rechenlogik der gebauten HTML-Datei (Cent-genau, Salden, Ausgleich).
 *   node src/test-rechnen.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "..", "rechnungen-alle.html"), "utf8");
const skript = html.split("<script>")[1].split("</script>")[0].replace(/\nlos\(\);\s*$/, "\n");

const kontext = { window: {}, console, Intl, Math, Date, JSON, setTimeout, clearTimeout };
kontext.globalThis = kontext;
vm.createContext(kontext);
vm.runInContext(skript, kontext);

const { textZuCent, anteileVon, auswertung, ausgleich, geld } = kontext;
// `stand` ist im Skript ein let-Binding, das nur von innen gesetzt werden kann
const standSetzen = vm.runInContext("(s) => { stand = s; }", kontext);

let fehler = 0;
function pruefe(name, ist, soll) {
  const a = JSON.stringify(ist), b = JSON.stringify(soll);
  if (a === b) { console.log("  ok   " + name); }
  else { console.log("  FEHL " + name + "\n       ist:  " + a + "\n       soll: " + b); fehler++; }
}

console.log("Betrag einlesen");
pruefe("Komma", textZuCent("12,90"), 1290);
pruefe("Punkt", textZuCent("12.90"), 1290);
pruefe("mit Euro und Leerzeichen", textZuCent(" 7 €"), 700);
pruefe("Summe mehrerer Posten", textZuCent("12,90+4,50"), 1740);
pruefe("Abzug", textZuCent("20-3,50"), 1650);
pruefe("leer", textZuCent(""), 0);
pruefe("Rundung .005", textZuCent("0,005"), 1);

console.log("\nAufteilung Cent-genau");
pruefe("10,00 auf 3", anteileVon(1000, ["A", "B", "C"]), { A: 334, B: 333, C: 333 });
pruefe("Summe bleibt erhalten",
  Object.values(anteileVon(1000, ["A", "B", "C"])).reduce((s, x) => s + x, 0), 1000);
pruefe("100,01 auf 5",
  Object.values(anteileVon(10001, ["A", "B", "C", "D", "E"])).reduce((s, x) => s + x, 0), 10001);
pruefe("negativer Rest",
  Object.values(anteileVon(-1000, ["A", "B", "C"])).reduce((s, x) => s + x, 0), -1000);

console.log("\nSalden und Ausgleich");
standSetzen({
  personen: ["Sina", "Alex", "Chiara", "Julius", "Marian"],
  eintraege: [
    // Sina kauft für alle ein
    { betrag: 10000, bezahltVon: "Sina", fuer: ["Sina", "Alex", "Chiara", "Julius", "Marian"] },
    // Julius zahlt ein Taxi, in dem nur drei saßen
    { betrag: 3000, bezahltVon: "Julius", fuer: ["Julius", "Marian", "Chiara"] },
    // Alex zahlt Getränke für alle
    { betrag: 2500, bezahltVon: "Alex", fuer: ["Sina", "Alex", "Chiara", "Julius", "Marian"] }
  ]
});
const a = auswertung();
pruefe("Gesamtsumme", a.gesamt, 15500);
pruefe("Summe aller Salden ist 0", a.salden.reduce((s, x) => s + x.saldo, 0), 0);
pruefe("Summe bezahlt = Gesamt", a.salden.reduce((s, x) => s + x.bezahlt, 0), 15500);
pruefe("Summe Anteile = Gesamt", a.salden.reduce((s, x) => s + x.anteil, 0), 15500);
// Sina: bezahlt 100,00 | Anteil 20,00 + 5,00 = 25,00 -> +75,00
pruefe("Saldo Sina", a.salden.find(s => s.person === "Sina").saldo, 7500);
// Alex: bezahlt 25,00 | Anteil 25,00 -> 0
pruefe("Saldo Alex", a.salden.find(s => s.person === "Alex").saldo, 0);
// Julius: bezahlt 30,00 | Anteil 20,00 + 10,00 + 5,00 = 35,00 -> -5,00
pruefe("Saldo Julius", a.salden.find(s => s.person === "Julius").saldo, -500);
// Marian: bezahlt 0 | Anteil 20,00 + 10,00 + 5,00 = 35,00 -> -35,00
pruefe("Saldo Marian", a.salden.find(s => s.person === "Marian").saldo, -3500);
pruefe("Ausgleich gleicht alle Schulden aus",
  a.transfers.reduce((s, t) => s + t.betrag, 0),
  a.salden.filter(s => s.saldo > 0).reduce((s, x) => s + x.saldo, 0));
pruefe("Ausgleich braucht hoechstens n-1 Ueberweisungen", a.transfers.length <= 4, true);

console.log("\nZufallstest: Salden gehen immer auf");
const namen = ["Sina", "Alex", "Chiara", "Julius", "Marian"];
for (let runde = 0; runde < 500; runde++) {
  const eintraege = [];
  const anzahl = 1 + Math.floor(Math.random() * 25);
  for (let i = 0; i < anzahl; i++) {
    const fuer = namen.filter(() => Math.random() > 0.4);
    eintraege.push({
      betrag: 1 + Math.floor(Math.random() * 50000),
      bezahltVon: namen[Math.floor(Math.random() * namen.length)],
      fuer: fuer.length ? fuer : [namen[0]]
    });
  }
  standSetzen({ personen: namen, eintraege });
  const r = kontext.auswertung();
  const summeSalden = r.salden.reduce((s, x) => s + x.saldo, 0);
  const summeAnteile = r.salden.reduce((s, x) => s + x.anteil, 0);
  const offen = {};
  namen.forEach(n => offen[n] = r.salden.find(s => s.person === n).saldo);
  r.transfers.forEach(t => { offen[t.von] += t.betrag; offen[t.an] -= t.betrag; });
  const restOffen = Object.values(offen).reduce((s, x) => s + Math.abs(x), 0);
  if (summeSalden !== 0 || summeAnteile !== r.gesamt || restOffen !== 0) {
    console.log("  FEHL Runde " + runde, { summeSalden, summeAnteile, gesamt: r.gesamt, restOffen });
    fehler++;
    break;
  }
}
if (!fehler) console.log("  ok   500 Zufallsrunden: Salden = 0, Anteile = Gesamt, Ausgleich vollstaendig");

console.log("\nFormatierung");
pruefe("geld(7500)", geld(7500).replace(/ /g, " "), "75,00 €");

console.log(fehler ? "\n" + fehler + " Test(s) fehlgeschlagen" : "\nAlle Tests bestanden");
process.exit(fehler ? 1 : 0);
