import { IGenerator } from "./classes/IGenerator.js";
import * as fs from "fs";
import * as readline from "readline";

export default function executeAction<T>(filePath: string, gerador: IGenerator<T>) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  rl.on("line", (line: string) => {
    gerador.processarLinha(line);
  });

  rl.on("close", () => {
    return gerador.jogos;
  });
}
