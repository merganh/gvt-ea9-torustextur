# EA 9: Torustextur

Einsendeaufgabe 9, Modul Graphical Visualisation Technologies, TH Lübeck, Wintersemester 2026/27.

Eine einseitige WebGL-Anwendung (WebGL 1, ohne Framework) mit einem Torus, der mit
einer selbst erstellten, kachelbaren Bildtextur aus türkis-blauem Marmor belegt ist.
Dazu wurden die Geometriedaten des Torus um Texturkoordinaten ergänzt. Als
Erweiterung lässt sich auf eine prozedurale Malachit-Textur umschalten, die der
Fragment-Shader aus den Texturkoordinaten berechnet. Die Kamera kreist per
Pfeiltasten oder WASD um den Torus.

## Live-Demo

Öffentlich erreichbar unter:
<https://merganh.github.io/gvt-ea9-torustextur/>

## Lokal ausführen

Kein Build-Schritt. Die Seite muss über einen lokalen Server geöffnet werden, weil
der Browser Bilder aus `file://` nicht als WebGL-Textur freigibt:

```bash
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

Wird die Datei trotzdem direkt geöffnet, erscheint ein Hinweis in der Statuszeile
und die prozedurale Textur wird gezeigt.

## Deployment via GitHub Pages

Im Repo liegt ein Workflow unter `.github/workflows/pages.yml`, der die Seite bei
jedem Push auf `main` automatisch nach GitHub Pages deployt. Einmalig im Repo
unter **Settings → Pages → Build and deployment → Source** `GitHub Actions`
wählen.

## Aufbau

- `index.html`: gesamte Anwendung in einer Datei (HTML, CSS, JS und Shader inline)
- `textures/marmor.webp`: Bildtextur, 2048 × 2048 Pixel, kachelbar, selbst erstellt
- `tools/`: Generator der Bildtextur (`marmor.html`, Canvas 2D, ausgeführt über `node tools/build-texture.mjs` mit Chrome)

Das Bildmaterial ist vollständig selbst erstellt, es werden keine externen
Bibliotheken oder Fremdbilder verwendet.

## Bedienung

- **←** oder **a**: Kamera kreist nach links
- **→** oder **d**: Kamera kreist nach rechts
- **↑** oder **w**: Kamera höher (bis 85°)
- **↓** oder **s**: Kamera tiefer (bis -60°)
- **+** und **-**: Kamera näher bzw. weiter weg (Abstand 2,2 bis 7,0)
- **1**: Bildtextur
- **2**: prozedurale Textur (Erweiterung)
- **t**: zwischen beiden Texturen umschalten

Jede Taste hat einen Button mit derselben Wirkung.

## Quelltext-Markierung

Die für die Aufgabe geschriebenen JavaScript- und Shader-Stellen sind mit
`// START EA9_TORUSTEXTUR` und `// END EA9_TORUSTEXTUR` markiert.
