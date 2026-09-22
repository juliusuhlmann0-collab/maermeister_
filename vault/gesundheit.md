# Gesundheit & Zepp-Daten

Kein direkter Zepp-API-Zugriff möglich. Weg stattdessen: Zepp synct zu Apple Health, die App
**"Health Auto Export"** exportiert daraus (JSON + GPX-Routen bei Workouts).

**Automatisch (läuft seit 20.09.2026):** Health Auto Export exportiert per Automation direkt
in einen selbst angelegten Google-Drive-Ordner
["Health Auto Export"](https://drive.google.com/drive/folders/1VkyoFCdVDO8v7djnmrXDI7_1zuJCOCeM)
(id `1VkyoFCdVDO8v7djnmrXDI7_1zuJCOCeM`, verschachtelt unter einem gleichnamigen Oberordner –
das hat die App so angelegt, nicht der ursprünglich von mir erstellte leere Ordner). Ein
JSON pro Tag, ich schau da beim 5:25-Morgen-Check-in selbst rein.
**Fallback, falls doch mal nötig:** ZIP manuell schicken, wie bisher.

**Bekannte Schwäche (22.09.2026 entdeckt):** die Uhr unterschätzt vermutlich die Kalorien bei
Siemens deutlich. Am 22.09. zeigte "active_energy" für die volle Schicht (6:10–14:30, 8h20min)
nur 240 kcal – bei durchgehend erhöhtem Puls (Ø 92 bpm) und 6.233 Schritten wirkt das zu niedrig.
Grund: Aktivitäts-Algorithmen sind auf erkennbare Bewegungsmuster (Gehen, Laufen, Radfahren)
trainiert, nicht auf stehende Dauerbelastung mit viel Handarbeit (Kabel verlegen/verbiegen,
Bauteile einbauen) – genau das, was den Siemens-Job laut TDEE-Einstufung zu "sehr aktiv" macht.
Grobe MET-Schätzung für die Schicht: 600–1.500 kcal netto aktiv (statt 240 kcal), je nachdem wie
intensiv die Handarbeit an dem Tag war. Heißt: Kalorienbilanzen, die auf reinen Watch-Daten
beruhen, sind an Arbeitstagen wahrscheinlich zu Ungunsten von Julius verzerrt (er verbrennt real
mehr, als die Uhr zeigt) – bei der Bewertung mitdenken, nicht blind den Watch-Wert übernehmen.

**Zweite bekannte Schwäche:** Autofahren wird von der Uhr teils als Training/Workout erkannt
(Vibration/Bewegung vom Fahren verwechselt der Algorithmus offenbar mit Aktivität). Bei kurzen,
unklaren "Aktivität"-Einträgen in Zepp (vor allem wenn sie zeitlich zu einer Autofahrt passen
könnten) im Zweifel nachfragen statt sie unhinterfragt als echtes Training zu werten.

## Zusammenfassung 21.08.–20.09.2026 (aus erstem Export)

| Metrik | Wert |
|---|---|
| Schritte/Tag (Ø) | 8.087 (Min 1.796 / Max 14.811) |
| Aktive Energie/Tag (Ø) | 1.395 kJ (~333 kcal) |
| Ruhepuls (Ø) | 54,9 bpm (nur 18 von 31 Tagen mit Uhr-Daten) |
| Schlaf (Ø) | 6,6 Std (Min 3,9 / Max 8,2 – nur 18 Nächte erfasst) |
| HRV (Ø) | 97,9 ms |
| SpO2 (Ø) | 98,0 % |

**Lücke:** Ladeteil der Uhr war ein paar Tage weg, deshalb nur 18 statt 31 Tage mit
Puls/Schlaf/HRV – Schritte kommen zusätzlich vom Handy, daher dort alle 31 Tage da.

## Radfahren (3 Einheiten im Zeitraum)

| Datum | Dauer | Distanz | Ø-Speed | Energie | Route |
|---|---|---|---|---|---|
| 06.09.2026 | 92 min | 19,3 km | 12,6 km/h | 2.503 kJ | [GPX](routen/2026-09-06-radfahren.gpx) |
| 20.09.2026, 08:11 | 58 min | 18,4 km | 19,0 km/h | 4.706 kJ | [GPX](routen/2026-09-20-radfahren-0811.gpx) |
| 20.09.2026, 10:57 | 58 min | 18,0 km | 18,6 km/h | 5.025 kJ | [GPX](routen/2026-09-20-radfahren-1057.gpx) |

Das ist genau das Rennrad-Element aus dem Traumleben-Bild – findet also schon real statt.

**20.09.2026 – Vorfall:** während der ersten Fahrt (08:11, Hinfahrt zu Omi) fast ohnmächtig
geworden, zum ersten Mal überhaupt. Fueling bis dahin nur 2 Müsliriegel + wenig Wasser, dazu
früh, nüchtern und ohnehin wenig Schlaf zuletzt – klare, einfache Erklärung (nicht das spätere
Frühstück bei Omi, das kam erst danach). Für künftige Einheiten: vor der Fahrt mehr essen als
nur Riegel (besonders wenn's die erste/harte Einheit am Tag ist), mehr/regelmäßiger trinken,
nach intensiver Belastung langsam austreten statt abrupt stoppen. Falls es trotzdem nochmal
passiert: ärztlich abklären lassen, nicht nur weiter analysieren.

**9-Uhr-Pause (Omi):** 3 Eier + 1 Nutella-Hörnchen – guter Eiweiß-Anteil durch die Eier.

## Morgenroutine (fester Ablauf, 20.09.2026 festgelegt)

1. Aufstehen (5:20)
2. 0,5 L Wasser trinken
3. Magnesium + Kreatin (5g) nehmen
4. Vor Frühstück essen (Nr. 1 aus [ernaehrung.md](ernaehrung.md): Schoko-Reiswaffeln + Banane)
5. Zähne putzen

**Kreatin:** 5g/Tag, Timing egal (sättigt sich über Zeit im Muskel, tägliche Konsistenz zählt
mehr als Uhrzeit) – einfach immer zur Morgenroutine dazu, dann wird's nicht vergessen.

## Abendroutine

- Sachen für den nächsten Tag fertig packen (Arbeit/Gym-Tasche etc.), immer am Vorabend.

## Tägliche Basics (Teil vom Morgen-Check-in)

Kurzer Habit-Check, keine große Sache – einfach ja/nein beim Morgen-Check-in.

| Datum | Wasser 0,5L | Magnesium | Kreatin | Zeug gepackt (Vorabend) | Notiz |
|---|---|---|---|---|---|

## Laufendes Log (manuelle Kurz-Einträge)

| Datum | Schlaf (h) | Schritte | Ruhepuls | Aktive kcal | Notiz |
|---|---|---|---|---|---|
| 22.09.2026 | 7,16 (21:39–5:27, davon 1,15 Tiefschlaf, 1,92 REM, 0,58 wach) | – | 54 | mind. 762 kcal (Krafttraining 643 + Laufband/Aktivität-Segmente 119, Laufband-eigene kcal nicht separat angezeigt) | Krafttraining 15:37–17:05 Uhr (1:27:35, Ø-Puls 119), danach Laufband 17:05–17:20 Uhr (14:54 Min, 1,18 km) – beides explizit als Workout gestartet und in der Zepp-App bestätigt (Screenshot), war zum Zeitpunkt des Nachfragens nur noch nicht in der Drive-Datei synct. HRV Ø ~111ms (Nacht), deutlich über dem Monats-Schnitt (97,9ms) – gute Erholung. Bettzeit 21:39 lag nah an der gestern empfohlenen Zeit (21:00–21:15) |
| 21.09.2026 | 7,69 (21:29–5:39, davon 0,98 Tiefschlaf, 2,32 REM) | – | 60 | – | Deutlich besser als der 6,6h-Schnitt |
| 20.09.2026 | – | 13.587 (bis 19 Uhr) | – | 896 | Sonntag, kein Dienst – sonst viel im Bett gelegen, nur die 2 Radfahrten als aktiver Teil |
