import express, { Request, Response } from "express";
import * as fs from "fs";
import * as readline from "readline";
import GeradorRelatorio from "../classes/GeradorRelatorio.js";
import executeAction from "../executeAction.js";
import ParserGenerator from "../classes/ParserGenerator.js";

const app = express();
const port = 8000;

const filePath = "log/games.log";

app.get("/game/resumo", (req: Request, res: Response) => {
  let gerador = new ParserGenerator();

  executeAction(filePath, gerador);

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  rl.on("close", () => {
    res.json(gerador.jogos);
  });
});

app.get("/game/relatorio/:id", (req: Request, res: Response) => {
  let gerador = new GeradorRelatorio();

  executeAction(filePath, gerador);

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  rl.on("close", () => {
    if (req.params.id && gerador.jogos[req.params.id]) {
      res.json(gerador.jogos[req.params.id]);
    } else {
      res
        .status(404)
        .json({ [req.params.id ?? "result"]: "Jogo não encontrado" });
    }
  });
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
