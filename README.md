# Rechnungen & Abrechnung

Zwei eigenständige HTML-Dateien, mit denen eine Gruppe zwei Wochen lang gemeinsame Ausgaben
sammelt. Jeder fotografiert seine Belege, am Ende rechnet die Seite aus, wer wem wie viel schuldet.

| Datei | Für wen |
|---|---|
| `rechnungen-alle.html` | Sina, Alex, Chiara, Julius, Marian |
| `abrechnung-julius-marian-chiara.html` | Julius, Marian, Chiara |
| `index.html` | Startseite mit Links auf beide |

Beide Dateien enthalten dieselbe Rechenlogik – die Personenliste und die Farbe unterscheiden sich.

## Benutzen

Datei per Doppelklick im Browser öffnen, oder auf dem Handy zum Startbildschirm hinzufügen.
Es wird kein Server, kein Internet und kein Konto gebraucht.

1. **+** unten rechts → Beleg fotografieren, Betrag eintippen, „bezahlt von" und „für wen" wählen.
   Mehrere Posten gehen direkt im Betragsfeld: `12,90+4,50`.
2. Der Reiter **Abrechnung** zeigt jederzeit: was jeder bezahlt hat, was sein eigener Anteil ist,
   den Saldo (grün = bekommt Geld, rot = muss zahlen) und die kürzestmögliche Liste an Überweisungen.
3. Zeitraum, Länge und Teilnehmer stehen unter **Einstellungen**. Voreingestellt sind 14 Tage ab heute.

## Daten zusammenführen

Alles liegt lokal im Browser des jeweiligen Geräts – es gibt keinen gemeinsamen Server.
Zum Zusammenrechnen exportiert jeder unter *Einstellungen* seine Datei (`Export mit Fotos`
oder platzsparend `Export ohne Fotos`), und eine Person importiert alle Dateien nacheinander.
Einträge werden über ihre ID erkannt: doppeltes Importieren verdoppelt nichts, und bei
Änderungen gewinnt die neuere Fassung.

Zusätzlich gibt es `CSV (Excel)` für die Tabellenkalkulation, `Drucken / PDF` und
`Als Text kopieren` für den Gruppenchat.

## Technisch

- Eine Datei, keine externen Abhängigkeiten, funktioniert offline.
- Speicherung in IndexedDB; wenn die nicht verfügbar ist, automatisch localStorage.
  Steht gar nichts zur Verfügung (z. B. privater Modus), warnt die Seite oben sichtbar.
- Fotos werden vor dem Speichern auf max. 1600 px verkleinert und als JPEG abgelegt.
- Gerechnet wird durchgängig in Cent. Der Rest einer Teilung (z. B. 10,00 € auf 3) wird
  deterministisch verteilt, damit die Summe der Anteile exakt der Gesamtsumme entspricht.
- Ausgleich per Greedy-Verfahren: der größte Schuldner zahlt an den größten Gläubiger,
  das ergibt höchstens *n − 1* Überweisungen.

## Entwicklung

Die HTML-Dateien werden aus einer gemeinsamen Vorlage erzeugt, damit die Logik nicht auseinanderläuft:

```sh
node build.js          # erzeugt beide HTML-Dateien aus src/vorlage.html
node src/test-rechnen.js   # prüft die Rechenlogik der gebauten Datei
```

Weitere Gruppen oder andere Namen: `VARIANTEN` in `build.js` ergänzen und neu bauen.
