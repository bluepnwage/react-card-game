import fs from "fs/promises";
import path from "node:path";
const test = await fs.readdir(path.join(process.cwd(), "public"));
console.log(test);

const arr = [
  ...new Set(
    test
      .filter((value) => value.includes("sm"))
      .map((value) => {
        const name = path.parse(value);
        console.log(name);
        return name.name;
      })
  )
];

await fs.writeFile(path.join(process.cwd(), "text.json"), JSON.stringify({ files: arr }, null, 2));
