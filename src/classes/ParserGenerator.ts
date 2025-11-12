import { SimpleParse } from "../data/interfaces.js";
import { IGenerator } from "./IGenerator.js";

export default class ParserGenerator extends IGenerator<SimpleParse> {
  novoJogo = (): void => {
    this.countJogo++;

    this.jogos[`game_${this.countJogo}`] = {
      total_kills: 0,
      players: [],
      kills: {},
    };
  };

  contabilizarKill = (line: string) => {
    const jogo = this.jogos[`game_${this.countJogo}`];
    if (jogo) {
      jogo.total_kills++;

      const [nomeKiller, nomeKilled] = this.pegarKillerAndKilled(line);

      if (nomeKiller && nomeKiller != "" && nomeKiller != "<world>") {
        this.registrarPlayer(nomeKiller);
      }

      if (nomeKilled && nomeKilled != "") {
        this.registrarPlayer(nomeKilled);
      }

      if (nomeKilled && nomeKiller == "<world>") {
        jogo.kills[nomeKilled] = (jogo.kills[nomeKilled] ?? 0) - 1;
      } else if (nomeKilled && nomeKiller && nomeKiller != "<world>") {
        jogo.kills[nomeKiller] = (jogo.kills[nomeKiller] ?? 0) + 1;
      }
    }
  };

  registrarPlayer = (nome: string) => {
    const jogo = this.jogos[`game_${this.countJogo}`];

    if (jogo && !jogo.players.includes(nome)) {
      jogo.players.push(nome);
      jogo.kills[nome] = 0;
    }
  };
}
