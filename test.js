import fs from "fs/promises";
import path from "node:path";
const test = await fs.readdir(path.join(process.cwd(), "public"));
console.log(test);

const arr = [...new Set(test.filter((value) => value.includes("sm") && value.includes("webp")))];

await fs.writeFile(path.join(process.cwd(), "text.json"), JSON.stringify({ files: arr }, null, 2));
