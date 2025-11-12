import express, { Request, Response } from "express";
import * as fs from "fs";
import * as readline from "readline";
import GeradorRelatorio from "../classes/GeradorRelatorio.js";
import executeAction from "../executeAction.js";
import ParserGenerator from "../classes/ParserGenerator.js";

const app = express();
const port = 8000;

const filePath = "log/games.log";

app.get("/game/resumo", async (req: Request, res: Response) => {
  try {
    let gerador = new ParserGenerator();

    await executeAction(filePath, gerador);

    res.json(gerador.jogos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar arquivo" });
  }
});

app.get("/game/resumo/:id", async (req: Request, res: Response) => {
  try {
    let gerador = new ParserGenerator();

    await executeAction(filePath, gerador);

    if (req.params.id && gerador.jogos[req.params.id]) {
      res.json(gerador.jogos[req.params.id]);
    } else {
      res
        .status(404)
        .json({ [req.params.id ?? "result"]: "Jogo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar arquivo" });
  }
});

app.get("/game/relatorio/:id", async (req: Request, res: Response) => {
  try {
    let gerador = new GeradorRelatorio();

    await executeAction(filePath, gerador);

    if (req.params.id && gerador.jogos[req.params.id]) {
      res.json(gerador.jogos[req.params.id]);
    } else {
      res
        .status(404)
        .json({ [req.params.id ?? "result"]: "Jogo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar arquivo" });
  }
});

app.get("/game/ids", async (req: Request, res: Response) => {
  try {
    let gerador = new ParserGenerator();

    await executeAction(filePath, gerador);

    res.json(Object.keys(gerador.jogos));
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar arquivo" });
  }
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
