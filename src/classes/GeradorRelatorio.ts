import { RelatorioJogo } from "../data/interfaces.js";
import { IGenerator } from "./IGenerator.js";

export default class GeradorRelatorio extends IGenerator<RelatorioJogo> {
  novoJogo = (): void => {
    this.countJogo++;

    this.jogos[`game_${this.countJogo}`] = {
      kills_by_means: {},
      general_ranking: {},
      killed_by_world: {},
    };
  };

  contabilizarKill = (line: string) => {
    const jogo = this.jogos[`game_${this.countJogo}`];
    if (jogo) {
      this.contabilizarMean(line);

      const [nomeKiller, nomeKilled] = this.pegarKillerAndKilled(line);

      if (nomeKilled && nomeKiller == "<world>") {
        jogo.general_ranking[nomeKilled] = (jogo.general_ranking[nomeKilled] ?? 0) - 1;
        this.contabilizarWorldKill(nomeKilled);
      } else if (nomeKilled && nomeKiller && nomeKiller != "<world>") {
        jogo.general_ranking[nomeKiller] = (jogo.general_ranking[nomeKiller] ?? 0) + 1;
      }
    }
  };

  contabilizarMean = (line: string) => {
    const jogo = this.jogos[`game_${this.countJogo}`];

    if (jogo) {
      const killMean = line.trim().substring(line.trim().lastIndexOf(" ") + 1);

      jogo.kills_by_means[killMean] = (jogo.kills_by_means[killMean] ?? 0) + 1;
    }
  };

  contabilizarWorldKill = (killed: string) => {
    const jogo = this.jogos[`game_${this.countJogo}`];
    if (jogo) {
      jogo.killed_by_world[killed] = (jogo.killed_by_world[killed] ?? 0) + 1;
    }
  };

  registrarPlayer = (nome: string) => {
    const jogo = this.jogos[`game_${this.countJogo}`];

    if (jogo && !Object.keys(jogo.general_ranking).includes(nome)) {
      jogo.general_ranking[nome] = 0
    }

    if(jogo && !Object.keys(jogo.killed_by_world).includes(nome)){
      jogo.killed_by_world[nome] = 0
    }
  };
}
