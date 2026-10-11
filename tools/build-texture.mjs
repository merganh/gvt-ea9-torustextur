// Erzeugt textures/marmor.webp mit headless Chrome aus tools/marmor.html.
// Aufruf: node tools/build-texture.mjs   (benötigt Google Chrome, Pfad ggf. über CHROME anpassen)
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const size = process.env.SIZE || "2048";
const type = process.env.TYPE || "webp";
const quality = process.env.QUALITY || "0.92";

const url = pathToFileURL(join(here, "marmor.html")).href + "?size=" + size + "&type=" + type + "&q=" + quality;
const dom = execFileSync(chrome, ["--headless=new", "--disable-gpu", "--dump-dom", url],
  { encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
const m = dom.match(/data:image\/(png|webp|jpeg);base64,([A-Za-z0-9+/=]+)/);
if (!m) throw new Error("Kein Bild erhalten");
const ext = m[1] === "jpeg" ? "jpg" : m[1];
const out = join(here, "..", "textures", "marmor." + ext);
const buf = Buffer.from(m[2], "base64");
writeFileSync(out, buf);
console.log("geschrieben:", out, Math.round(buf.length / 1024) + " KB");
