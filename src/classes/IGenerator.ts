export abstract class IGenerator<T> {
  countJogo: number = 0;
  jogos: Record<string, T> = {};

  abstract novoJogo(): void;
  abstract contabilizarKill(line: string): void;
  abstract registrarPlayer(nome: string): void;

  processarLinha = (line: string): void => {
    let separado = line.trim().split(" ");

    if (separado[1] == "InitGame:") {
      this.novoJogo();
    }

    if (separado[1] == "Kill:") {
      this.contabilizarKill(line);
    }

    if (separado[1] == "ClientUserinfoChanged:") {
      this.playerConectado(line);
    }
  };

  pegarKillerAndKilled = (line: string): Array<string> => {
    const matchkiller = line.match(/\d: (.+?) killed/);
    let nomeKiller = "";

    if (matchkiller && matchkiller[1]) {
      nomeKiller = matchkiller[1];
    }

    const matchkilled = line.match(/killed (.+?) by/);
    let nomeKilled = "";

    if (matchkilled && matchkilled[1]) {
      nomeKilled = matchkilled[1];
    }

    return [nomeKiller, nomeKilled];
  };

  playerConectado = (line: string) => {
    const matchPlayer = line.trim().match(/n\\(.+)\\t\\/);

    if (matchPlayer && matchPlayer[1]) {
      this.registrarPlayer(matchPlayer[1]);
    }
  };
}
